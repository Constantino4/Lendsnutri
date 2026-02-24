
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FoodAnalysisResult } from "../types";

/**
 * Analisa um alimento via imagem (base64) ou texto usando o modelo Gemini.
 */
export const analyzeFood = async (
  imageB64?: string,
  textQuery?: string
): Promise<FoodAnalysisResult> => {

  // Pega a chave da API da variável de ambiente
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash" // Modelo que está liberado via API
  });

  let prompt = `
Você é um nutricionista e cientista de alimentos.
Responda em JSON válido com:
foodName, description, estimatedWeight, calories, macros {protein, carbs, fat, fiber},
healthScore (0-100), pros[], cons[], tips[], processingLevel, allergens[].
Idioma: Português Brasileiro.
`;

  // Se estiver usando uma imagem
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

  // Se não tiver imagem, mas tiver texto
  if (textQuery) {
    prompt += `\nAlimento para analisar: ${textQuery}`;
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    return JSON.parse(text) as FoodAnalysisResult;
  }

  // Caso nenhum dado (imagem ou texto) tenha sido fornecido
  throw new Error("Nenhuma imagem ou texto fornecido para análise.");
};
