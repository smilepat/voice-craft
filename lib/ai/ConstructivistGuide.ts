import { GoogleGenerativeAI } from "@google/generative-ai";
import { LeaderRole } from "@/lib/leaderRoles";
import { ConstructivistContent } from "@/context/LeaderContext";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function generateConstructivistGuidance(
    role: LeaderRole
): Promise<ConstructivistContent> {
    if (!apiKey) {
        return getFallbackContent(role);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
You are a constructivist learning guide for children aged 6-12.
The child has chosen to explore becoming a future "${role.title}".
Their areas of interest include: ${role.domains.join(", ")}.

Constructivist pedagogy principles you MUST follow:
- Ask questions instead of giving answers
- Build on what the child might already know
- Scaffold from simple to complex
- Encourage hands-on discovery and experimentation
- Promote reflection on what they learned
- Connect learning to real-world meaning

Generate engaging, age-appropriate content. Use simple words a 6-year-old can understand but ideas that challenge a 12-year-old.

Return JSON with this exact structure:
{
  "wonderQuestions": [
    "A thought-provoking question that starts with 'What if...' or 'Have you ever wondered...'",
    "A question connecting their everyday life to the ${role.title} domain",
    "A deeper question that encourages systems thinking about ${role.domains[0]}"
  ],
  "explorationActivity": {
    "title": "A fun, hands-on activity name",
    "steps": [
      "Step 1: A simple observation or gathering step",
      "Step 2: A doing/creating/experimenting step",
      "Step 3: A comparing or connecting step",
      "Step 4: A sharing or extending step"
    ]
  },
  "reflectionPrompts": [
    "A prompt asking what surprised them or what they noticed",
    "A prompt asking how this connects to something they already knew"
  ],
  "knowledgeChallenge": {
    "title": "A mini-challenge name that sounds exciting",
    "description": "A 1-2 sentence challenge that pushes them to explore further on their own"
  },
  "connectionToWorld": "A warm, inspiring 1-2 sentence statement about how future ${role.title}s make the world better"
}

IMPORTANT: Keep all text child-friendly, positive, and empowering. No scary content. No specific people's names.
`;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]) as ConstructivistContent;
        }
        return getFallbackContent(role);
    } catch (error) {
        console.error("ConstructivistGuide Error:", error);
        return getFallbackContent(role);
    }
}

function getFallbackContent(role: LeaderRole): ConstructivistContent {
    return {
        wonderQuestions: [
            `What if you could change one thing about ${role.domains[0]} — what would it be?`,
            `Have you ever noticed something about ${role.domains[1]} in your everyday life?`,
            `Why do you think ${role.domains[0]} matters to people around the world?`,
        ],
        explorationActivity: {
            title: `The ${role.title}'s First Discovery`,
            steps: [
                `Look around your room and find something connected to ${role.domains[0]}.`,
                `Draw it or write 3 words that describe it.`,
                `Ask someone in your family what they think about it.`,
                `Now imagine how a ${role.title} would see it differently!`,
            ],
        },
        reflectionPrompts: [
            "What surprised you the most during this activity?",
            "Did this remind you of something you already knew? What was it?",
        ],
        knowledgeChallenge: {
            title: "The Curiosity Spark",
            description: `Find one new fact about ${role.domains[0]} and share it with someone you love!`,
        },
        connectionToWorld: `Future ${role.title}s like you will help make the world a kinder, smarter, more beautiful place. Every question you ask is a step forward!`,
    };
}
