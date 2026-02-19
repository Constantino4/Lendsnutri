
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FoodAnalysisResult } from "../types";

/**
 * Analisa um alimento via imagem (base64) ou texto usando o modelo Gemini.
 */
export const analyzeFood = async (imageB64?: string, textQuery?: string): Promise<FoodAnalysisResult> => {
  
  const apiKey = "AIzaSyBysOg5vTZ0bid7tPdT0P6Wbpvvm4sMHDc"; // Sua chave de API

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-3"
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
    
    // Chama o modelo com a imagem
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: cleanBase64
        }
      }
    ]);

    // Espera o resultado e retorna como JSON
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
