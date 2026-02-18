import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();
// Fallback: try loading from parent directory (useful when running from dist/)
// Need to go up from src/services -> src -> backend -> .env (3 levels up from __dirname if in src/services, or 2 levels up if in dist/services)
// In dist: dist/services/geminiService.js -> dist/services -> dist -> backend root
const envPath = require('path').resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });


import { ENV_SECRETS } from '../config/envSecrets';

const FALLBACK_KEY = "AIzaSyClJkefcaHzm8rR2EhONZx-SfBI188WjL0";
const ENV_KEY = ENV_SECRETS ? ENV_SECRETS.GEMINI_API_KEY : undefined;
const API_KEY = process.env.GEMINI_API_KEY || ENV_KEY || FALLBACK_KEY;

console.log(`[GeminiService] Loading API Key...`);
console.log(`[GeminiService] process.env.GEMINI_API_KEY exists: ${!!process.env.GEMINI_API_KEY}`);
console.log(`[GeminiService] ENV_SECRETS.GEMINI_API_KEY exists: ${!!ENV_KEY}`);
console.log(`[GeminiService] Using Key: ${API_KEY ? (API_KEY.substring(0, 5) + '...') : 'None'}`);

if (!API_KEY) {
    console.error("CRITICAL: GEMINI_API_KEY is completely missing.");
}

const genAI = new GoogleGenerativeAI(API_KEY || "dummy_key");
// User requested "gemini 2.5 flash lite", verified available as "gemini-2.5-flash-lite"
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

export class GeminiService {
    async generatePrompt(data: { keywords: string, taskType: string, platform?: string }): Promise<string> {
        console.log(`[GeminiService] Request received: ${JSON.stringify(data)}`);

        if (!API_KEY) {
            console.error("[GeminiService] API Key is missing!");
            throw new Error("Gemini API Key is missing.");
        }

        const prompt = `
        You are an expert prompt engineer. Create a detailed prompt for ${data.platform || 'Gemini'} based on:
        Keywords: ${data.keywords}
        Task: ${data.taskType}
        
        Return ONLY the raw prompt text. No markdown, no explanations.
        `;

        try {
            console.log(`[GeminiService] Sending request to Gemini (Model: gemini-1.5-flash)...`);
            const result = await model.generateContent(prompt);
            console.log(`[GeminiService] Response received.`);
            const response = await result.response;
            const text = response.text();
            console.log(`[GeminiService] Text length: ${text.length}`);
            return text.trim();
        } catch (error: any) {
            console.error("Error generating content with Gemini:", error);
            throw new Error(`Gemini Error: ${error.message} (Stack: ${error.stack})`);
        }
    }
}
