import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("GEMINI_API_KEY is not set in environment variables.");
}

const genAI = new GoogleGenerativeAI(API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

interface GeneratePromptRequest {
    keywords: string;
    taskType: string;
    targetPlatform: string;
}

const PROMPT_TEMPLATE = `You are an expert prompt engineer. Your task is to clearer, more specific, and more effective prompt based on the user's input.

Input details:
- Keywords/Topic: {keywords}
- Task Type: {taskType}
- Target Platform: {targetPlatform}

Generate a single, high-quality prompt that I can copy and paste to use for the above task. The prompt should be optimized for an LLM (Large Language Model). Return ONLY the generated prompt text, nothing else.`;

export class GeminiService {
    async generatePrompt(data: GeneratePromptRequest): Promise<string> {
        if (!API_KEY) {
            throw new Error("Gemini API Key is missing.");
        }

        const prompt = PROMPT_TEMPLATE
            .replace('{keywords}', data.keywords)
            .replace('{taskType}', data.taskType)
            .replace('{targetPlatform}', data.targetPlatform);

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
