
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function getHistoricalInsight(location: string, voyageId: number): Promise<string> {
  if (!process.env.API_KEY) return "API Key not configured. Unable to fetch AI insights.";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a very brief (max 3 sentences) historical insight about Zheng He's visit to ${location} during his ${voyageId}th voyage. Specifically mention the exchange of goods, tribute, or cultural impact. Keep it engaging.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 150,
      }
    });
    return response.text || "No insights found for this location.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to fetch historical insights from AI.";
  }
}
