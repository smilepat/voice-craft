
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function getGeminiFeedback(text: string) {
    if (!apiKey) {
        return {
            strength: "You are consistent!",
            potential: "I see a future storyteller in you.",
            message: "I can't connect to my brain right now (Missing API Key), but I'm listening!",
        };
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    You are a warm, supportive teacher and mentor for a child. 
    The child just said: "${text}".
    
    Your goal is to act as a "Mirror" that reflects their strengths and potential.
    Do NOT just praise generic things. Find specific encouraging traits in their words.
    
    Return the response in JSON format with these keys:
    - strength: A short phrase identifying a positive trait (e.g., "Creative Thinker", "Empathetic Heart").
    - potential: A short sentence about what they could become or do (e.g., "You might invent new worlds one day.").
    - message: A warm, 2-sentence response validating their feelings.
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const textStats = response.text();

        // Simple parsing (in a real app, use structured output mode or more robust parsing)
        const jsonMatch = textStats.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        return {
            strength: "Unique Voice",
            potential: "You have a lot to share.",
            message: textStats
        };

    } catch (error) {
        console.error("Gemini Error:", error);
        return {
            strength: "Resilient",
            potential: "You keep trying even when things are tough.",
            message: "I'm having a little trouble thinking right now, but I heard you.",
        };
    }
}
