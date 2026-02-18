import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = "AIzaSyCKiBpZaYUv0Uq2GNJdgoMDD3EAWLMY9hY";
const genAI = new GoogleGenerativeAI(API_KEY);

async function checkModels() {
    const models = [
        "gemini-2.0-flash-lite-preview-02-05", // The likely correct name
        "gemini-2.0-flash-lite",
        "gemini-1.5-flash"
    ];

    console.log("Checking models with provided key...");

    for (const modelName of models) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            console.log(`Attempting generation with: ${modelName}`);
            await model.generateContent("Test");
            console.log(`✅ SUCCESS: ${modelName} is available.`);
        } catch (e: any) {
            console.log(`❌ FAILED: ${modelName} - ${e.message.split('\n')[0]}`);
        }
    }
}

checkModels();
