
import { GoogleGenAI, Type } from "@google/genai";

// Always use the process.env.API_KEY string directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTestRecommendations = async (symptoms: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User symptoms: "${symptoms}". Based on these symptoms, recommend 3 specific diagnostic tests from a standard medical lab (e.g., CBC, LFT, KFT, Thyroid, etc.). Provide a short medical reason for each.`,
      config: {
        responseMimeType: "application/json",
        // Using responseSchema for more robust JSON output as recommended in guidelines
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              test: {
                type: Type.STRING,
                description: 'The name of the diagnostic test.',
              },
              reason: {
                type: Type.STRING,
                description: 'The medical reason for the recommendation.',
              },
            },
            required: ["test", "reason"],
            propertyOrdering: ["test", "reason"],
          },
        },
      }
    });

    // response.text is a property, not a method
    if (response.text) {
      return JSON.parse(response.text.trim());
    }
    return [];
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};
