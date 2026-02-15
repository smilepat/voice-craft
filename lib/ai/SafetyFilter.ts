
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function checkSafety(text: string): Promise<{ safe: boolean; reason?: string }> {
    if (!apiKey) {
        // Mock safety check
        const badWords = ["hate", "stupid", "ugly", "kill"];
        const isSafe = !badWords.some(word => text.toLowerCase().includes(word));
        return {
            safe: isSafe,
            reason: isSafe ? undefined : "Please use kind words."
        };
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    You are a safety filter for a children's platform.
    Analyze this text: "${text}"
    
    Is it safe, respectful, and appropriate for children (ages 6-12)?
    It should NOT contain: bullying, violence, hate speech, sexual content, or personal identifiable information (PII).
    
    Return JSON: { "safe": boolean, "reason": string }
  `;

    try {
        const result = await model.generateContent(prompt);
        const textStats = result.response.text();
        const jsonMatch = textStats.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        return { safe: true };
    } catch (error) {
        console.error("Safety Check Error:", error);
        // Fail safe (or open depending on policy, fail safe for kids)
        return { safe: false, reason: "Safety check failed. Try again later." };
    }
}
