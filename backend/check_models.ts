import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = "AIzaSyCKiBpZaYUv0Uq2GNJdgoMDD3EAWLMY9hY";
const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
    try {
        console.log("Fetching available models...");
        // Note: listModels is not directly exposed on genAI instance in some versions, 
        // but we can try to get a model and run a basic prompt to verify the key works 
        // and check if specific model names are accepted if listModels fails.
        // However, looking at the library, we might not have a clean listModels method in this specific version usage.
        // Instead, I'll test the requested model name candidate "gemini-2.0-flash-lite-preview" and "gemini-1.5-flash".

        const modelsToTest = [
            "gemini-1.5-flash",
            "gemini-1.5-flash-001",
            "gemini-1.5-flash-8b",
            "gemini-2.0-flash-lite-preview-02-05",
            "gemini-pro",
            "gemini-1.0-pro"
        ];

        for (const modelName of modelsToTest) {
            console.log(`Testing model: ${modelName}`);
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Test");
                const response = await result.response;
                console.log(`SUCCESS: ${modelName} works. Response: ${response.text()}`);
                return; // Exit on first success to prefer the newest working one? No, let's see results.
            } catch (e: any) {
                console.log(`FAILED: ${modelName} - ${e.message.split('\n')[0]}`);
            }
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
