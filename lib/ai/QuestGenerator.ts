
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export interface Quest {
    id: string;
    title: string;
    description: string;
    type: "creative" | "observation" | "random";
}

export async function generateQuests(userContext?: string): Promise<Quest[]> {
    if (!apiKey) {
        return [
            {
                id: "1",
                title: "The Color Hunt",
                description: "Find 3 things in your room that are blue and describe how they feel.",
                type: "observation",
            },
            {
                id: "2",
                title: "Future Sound",
                description: "Close your eyes and imagine a sound from the year 3000. Hum it and record it.",
                type: "creative",
            },
        ];
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    You are a creative mentor for a child.
    The child says: "I don't know what to do."
    ${userContext ? `Context about the child: ${userContext}` : ""}
    
    Generate 2 simple, engaging "Quests" (activities) for them.
    They should be small, actionable, and focused on observation or creativity.
    
    Return JSON array:
    [{ "title": "...", "description": "...", "type": "creative" | "observation" }]
  `;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            const quests = JSON.parse(jsonMatch[0]);
            return quests.map((q: any, i: number) => ({ ...q, id: Date.now().toString() + i }));
        }
        return [];
    } catch (error) {
        console.error("Quest Error:", error);
        return [
            {
                id: "err1",
                title: "Draw a Circle",
                description: "Draw a perfect circle on a piece of paper.",
                type: "creative",
            }
        ];
    }
}
