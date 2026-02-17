import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("GEMINI_API_KEY is not set in environment variables.");
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
