import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = "AIzaSyC-AQnM7BI9vZcEz4l7G1fasBQ2bHeNFEw";
const genAI = new GoogleGenerativeAI(API_KEY);

async function checkModels() {
    const models = [
        "gemini-2.0-flash-lite",
        "gemini-2.0-flash-lite-preview-02-05",
        "gemini-2.5-flash-lite", // Testing user's specific request
        "gemini-1.5-flash"
    ];

    console.log("Checking models with NEW key...");

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
