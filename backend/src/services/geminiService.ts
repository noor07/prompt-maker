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

const genAI = new GoogleGenerativeAI(API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

interface GeneratePromptRequest {
    keywords: string;
    taskType: string;
    platform: string;
}

const PROMPT_TEMPLATE = `You are an expert prompt engineer. Generate a high-quality, professional prompt for the following task.
      
Topic: {keywords}
Mode: {taskType}
Target Platform: {platform}

The output should be optimized for a Large Language Model. Return ONLY the generated prompt text. No explanations.`;

export class GeminiService {
    async generatePrompt(data: GeneratePromptRequest): Promise<string> {
        if (!API_KEY) {
            throw new Error("Gemini API Key is missing.");
        }

        const prompt = PROMPT_TEMPLATE
            .replace('{keywords}', data.keywords)
            .replace('{taskType}', data.taskType)
            .replace('{platform}', data.platform || 'Gemini');

        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            return text.trim();
        } catch (error) {
            console.error("Error generating content with Gemini:", error);
            throw new Error("Failed to generate prompt.");
        }
    }
}
