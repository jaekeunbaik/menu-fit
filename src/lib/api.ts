'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";
import { MenuItem, UserContext } from './types';

export async function getRecommendations(context: UserContext): Promise<MenuItem[]> {
    const apiKey = process.env.GEMINI_API_KEY;
    console.log("API Key loaded:", apiKey ? "Yes (starts with " + apiKey.substring(0, 4) + ")" : "No");

    if (!apiKey) {
        console.error("Error: GEMINI_API_KEY is missing in process.env");
        throw new Error("Gemini API Key is missing");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
    Recommend 3 lunch menus based on the following context:
    - Weather: ${context.weather}
    - Condition: ${context.condition} ${context.amount ? `(Budget: ${context.amount} KRW)` : ''}
    - Yesterday's Menu: ${context.yesterday}

    The response must be in strict JSON format as an array of objects. 
    Each object must have the following keys:
    - name: Menu name (in Korean)
    - engName: Menu name in English (for image generation, e.g., "Kimchi Stew")
    - reason: A short recommendation reason (in Korean, friendly tone)
    - weather: A weather English keyword that matches the menu (Sunny, Rainy, Cold, Hot)

    Example JSON:
    [
      { "name": "비빔밥", "engName": "Bibimbap", "reason": "Reason string", "weather": "Sunny" }
    ]
    Do not include any markdown formatting like \`\`\`json. Just the raw JSON array.
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up potential markdown code blocks
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const menus: MenuItem[] = JSON.parse(cleanedText);
        return menus.slice(0, 3);
    } catch (error) {
        console.error("Gemini API Error:", error);
        // Fallback to a safe default if API fails
        return [
            { name: "비빔밥", engName: "Bibimbap", reason: "API 연결에 실패했어요. 하지만 건강한 비빔밥은 어떠세요?", weather: "Sunny" },
            { name: "김치찌개", engName: "Kimchi Stew", reason: "따뜻한 국물로 마음을 달래보세요.", weather: "Cold" },
            { name: "샌드위치", engName: "Sandwich", reason: "간단하게 한 끼 해결!", weather: "Sunny" },
        ];
    }
}
