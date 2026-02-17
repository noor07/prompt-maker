import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeminiService } from './src/services/geminiService';
import dotenv from 'dotenv';
dotenv.config();

const service = new GeminiService();

async function run() {
    console.log("Testing Gemini Service with gemini-2.0-flash...");
    try {
        const prompt = await service.generatePrompt({
            keywords: "code review",
            taskType: "coding",
            platform: "github"
        });
        console.log("Generated Prompt:", prompt);
    } catch (error) {
        console.error("Error:", error);
    }
}

run();
