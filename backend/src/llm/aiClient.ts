import { GoogleGenAI } from "@google/genai";
import SYSTEM_PROMPTS from "./prompts";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
	apiKey: process.env.AI_API_KEY,
});

export const llmSummarize = async (content: string) => {
	const response = await ai.models.generateContent({
		model: "gemini-2.5-flash-lite-preview-06-17",
		contents: SYSTEM_PROMPTS.researchSummarizer.systemPrompt(content),
		config: {
			thinkingConfig: {
				thinkingBudget: 0,
			},
			systemInstruction: SYSTEM_PROMPTS.researchSummarizer.systemInstructions,
			temperature: 0.1,
		},
	});
	return response.text;
};
