
import { GoogleGenAI } from "@google/genai";

export const askHistoryExpert = async (query: string) => {
  try {
    // Create instance right before call to ensure latest API key is used
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are Mohit Awasthi Sir, a world-class History professor specializing in Indian and World History for competitive exams like UGC NET, UPHESC, UPSC, and State PSCs. 
      Answer the student's query in Hindi with detailed historical context. Use professional yet encouraging tone.
      Query: ${query}`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "क्षमा करें, वर्तमान में उत्तर देने में समस्या हो रही है। कृपया पुनः प्रयास करें।";
  }
};

export const getDeepExplanation = async (question: string, context: string) => {
  try {
    // Create instance right before call to ensure latest API key is used
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Provide a very deep, academic, and detailed explanation in Hindi for this history question. Focus on historiography, different perspectives (Marxist, Nationalist, Subaltern), and primary sources if possible.
      Question: ${question}
      Previous Answer Context: ${context}`,
    });
    return response.text;
  } catch (error: any) {
    console.error("Deep Explanation Error:", error);
    if (error?.message?.includes("Requested entity was not found")) {
      throw new Error("API_KEY_ERROR");
    }
    return "विस्तृत व्याख्या उपलब्ध नहीं हो पा रही है।";
  }
};
