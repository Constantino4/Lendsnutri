
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FoodAnalysisResult } from "../types";

export const analyzeFood = async (
  imageB64?: string,
  textQuery?: string
): Promise<FoodAnalysisResult> => {

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("API Key não encontrada.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "mgemini-1.5-flash-latest"
  });

  let prompt = `
Você é um nutricionista e cientista de alimentos.
Responda em JSON válido com:
foodName, description, estimatedWeight, calories, macros {protein, carbs, fat, fiber},
healthScore (0-100), pros[], cons[], tips[], processingLevel, allergens[].
Idioma: Português Brasileiro.
`;

  if (textQuery) {
    prompt += `\nAlimento: ${textQuery}`;
  }

  if (imageB64) {
    const cleanBase64 = imageB64.includes(",")
      ? imageB64.split(",")[1]
      : imageB64;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: cleanBase64
        }
      }
    ]);

    const text = result.response.text();
    return JSON.parse(text) as FoodAnalysisResult;
  }

  if (!textQuery) {
    throw new Error("Nenhuma imagem ou texto fornecido.");
  }

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return JSON.parse(text) as FoodAnalysisResult;
};
