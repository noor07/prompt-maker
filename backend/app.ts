import express, { Request, Response, NextFunction } from 'express';
import { GeminiService } from './src/services/geminiService';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import * as path from 'path';
import cors from 'cors';

dotenv.config();

const app = express();
const geminiService = new GeminiService();

// Initialize Firebase Admin SDK
try {
    let serviceAccount;
    // Check if SERVICE_ACCOUNT_KEY env var exists (JSON string)
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        console.log("Found FIREBASE_SERVICE_ACCOUNT env var");
        try {
            // Check if it's base64 encoded (starts with ey... and no braces at start)
            const envVar = process.env.FIREBASE_SERVICE_ACCOUNT.trim();
            if (!envVar.startsWith('{')) {
                const decoded = Buffer.from(envVar, 'base64').toString('utf-8');
                serviceAccount = JSON.parse(decoded);
                console.log("Successfully decoded Base64 service account");
            } else {
                serviceAccount = JSON.parse(envVar);
            }
        } catch (error) {
            console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT:", error);
        }

    } else {
        // Fallback to local file for development
        try {
            const keyPath = path.resolve(process.cwd(), 'serviceAccountKey.json');
            console.log("Attempting to load service account from:", keyPath);
            serviceAccount = require(keyPath);
            console.log("Successfully loaded serviceAccountKey.json");
        } catch (err) {
            console.warn("Failed to load serviceAccountKey.json from", path.resolve(process.cwd(), 'serviceAccountKey.json'));
            console.warn("Also tried:", path.resolve(__dirname, './serviceAccountKey.json'));
        }
    }

    if (serviceAccount) {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
            console.log("Firebase Admin initialized successfully.");
        } else {
            console.log("Firebase Admin already initialized.");
        }
    } else {
        console.error("No service account credentials found. Auth will fail.");
    }
} catch (error) {
    console.error("Firebase Admin initialization failed:", error);
}

const db = admin.apps.length ? admin.firestore() : null;

app.use(cors());
// app.options('*', cors()); // Removed due to path-to-regexp error
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.body) {
        let bodyData = req.body;
        if (Buffer.isBuffer(req.body) || (bodyData && bodyData.type === 'Buffer' && Array.isArray(bodyData.data))) {
            try {
                const raw = Buffer.isBuffer(req.body) ? req.body : Buffer.from(bodyData.data);
                req.body = JSON.parse(raw.toString('utf-8'));
            } catch (e) {
                console.error("Failed to parse buffer body", e);
            }
        }
    }
    next();
});


// Authentication Middleware
const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    console.log(`[Auth] Header: ${authHeader ? 'Present' : 'Missing'}`);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("[Auth] Missing or invalid header format");
        res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
        return;
    }

    const idToken = authHeader.split('Bearer ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        console.log(`[Auth] Token verified for UID: ${decodedToken.uid}`);
        (req as any).user = decodedToken;
        next();
    } catch (error) {
        console.error("[Auth] Error verifying ID token:", error);
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to Prompt Maker Backend!' });
});

app.get('/debug-config', (req: Request, res: Response) => {
    res.json({
        geminiKey: process.env.GEMINI_API_KEY ? 'Present' : 'Missing',
        geminiKeyPrefix: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 4) + '...' : 'N/A',
        firebaseServiceAccount: process.env.FIREBASE_SERVICE_ACCOUNT ? 'Present' : 'Missing',
        firebaseRawLength: process.env.FIREBASE_SERVICE_ACCOUNT ? process.env.FIREBASE_SERVICE_ACCOUNT.length : 0,
        isBase64: process.env.FIREBASE_SERVICE_ACCOUNT ? !process.env.FIREBASE_SERVICE_ACCOUNT.trim().startsWith('{') : false
    });
});

app.post('/generate', async (req: Request, res: Response) => {
    try {
        let bodyData = req.body;

        // Handle Buffer-like object/Buffer from serverless-offline
        if (Buffer.isBuffer(req.body) || (bodyData && bodyData.type === 'Buffer' && Array.isArray(bodyData.data))) {
            try {
                const raw = Buffer.isBuffer(req.body) ? req.body : Buffer.from(bodyData.data);
                bodyData = JSON.parse(raw.toString('utf-8'));
            } catch (e) {
                console.error("Failed to parse buffer body", e);
            }
        } else if (typeof req.body === 'string') {
            try {
                bodyData = JSON.parse(req.body);
            } catch (e) {
                console.error("Failed to parse string body", e);
            }
        }

        console.log("[Generate] Body received:", bodyData);

        // Hybrid Schema Support (Backwards Compatibility)
        const promptText = bodyData.prompt || bodyData.keywords;
        const mode = bodyData.mode || bodyData.taskType;
        // Default to 'Gemini' if platform is missing (legacy frontend)
        const platform = bodyData.platform || bodyData.targetPlatform || 'Gemini';

        console.log(`[Generate] Resolved - prompt: ${!!promptText}, mode: ${!!mode}, platform: ${platform}`);

        if (!promptText || !mode) {
            console.error("[Generate] Missing required fields. Body keys:", Object.keys(bodyData || {}));
            res.status(400).json({ error: "Missing required fields: prompt/keywords, mode/taskType" });
            return;
        }

        const prompt = await geminiService.generatePrompt({
            keywords: promptText,
            taskType: mode,
            platform
        });
        res.json({ prompt });
    } catch (error: any) {
        console.error("Error in /generate:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});

// --- Firestore Endpoints ---

// Save Prompt
app.post('/save-prompt', authenticate, async (req: Request, res: Response) => {
    if (!db) {
        console.error("Firestore DB is not initialized");
        res.status(503).json({ error: "Firestore not initialized" });
        return;
    }

    try {
        const { uid } = (req as any).user;
        const { keywords, taskType, targetPlatform, generatedPrompt } = req.body;

        if (!generatedPrompt) {
            console.error("[SavePrompt] Missing generatedPrompt. Body keys:", Object.keys(req.body));
            res.status(400).json({ error: "Missing required field: generatedPrompt" });
            return;
        }

        const promptData = {
            keywords,
            taskType,
            targetPlatform,
            generatedPrompt,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };

        const docRef = await db.collection('users').doc(uid).collection('prompts').add(promptData);
        console.log(`[SavePrompt] Saved document ID: ${docRef.id}`);
        res.json({ message: "Prompt saved successfully", id: docRef.id });
    } catch (error: any) {
        console.error("Error saving prompt:", error);
        res.status(500).json({ error: "Failed to save prompt" });
    }
});

// Get Prompts
app.get('/get-prompts', authenticate, async (req: Request, res: Response) => {
    if (!db) {
        res.status(503).json({ error: "Firestore not initialized" });
        return;
    }

    try {
        const { uid } = (req as any).user;
        const snapshot = await db.collection('users').doc(uid).collection('prompts').orderBy('createdAt', 'desc').get();

        const prompts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.json({ prompts });
    } catch (error: any) {
        console.error("Error fetching prompts:", error);
        res.status(500).json({ error: "Failed to fetch prompts" });
    }
});

// Delete Prompt
app.delete('/delete-prompt/:promptId', authenticate, async (req: Request, res: Response) => {
    if (!db) {
        res.status(503).json({ error: "Firestore not initialized" });
        return;
    }

    try {
        const { uid } = (req as any).user;
        const { promptId } = req.params;

        if (typeof promptId !== 'string') {
            res.status(400).json({ error: "Invalid prompt ID" });
            return;
        }

        await db.collection('users').doc(uid).collection('prompts').doc(promptId).delete();
        res.json({ message: "Prompt deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting prompt:", error);
        res.status(500).json({ error: "Failed to delete prompt" });
    }
});

export default app;
