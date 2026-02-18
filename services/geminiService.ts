
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FoodAnalysisResult } from "../types";

/**
 * Analisa um alimento via imagem (base64) ou texto usando o modelo Gemini.
 */
export const analyzeFood = async (imageB64?: string, textQuery?: string): Promise<FoodAnalysisResult> => {
  
  // Aqui você substitui diretamente pela sua chave de API
  const apiKey = "AIzaSyBysOg5vTZ0bid7tPdT0P6Wbpvvm4sMHDc"; 

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"  // ou "gemini-pro", dependendo do modelo que você escolher
  });

  // O resto do seu código segue normalmente
  let prompt = `
  Você é um nutricionista e cientista de alimentos.
  Responda em JSON válido com:
  foodName, description, estimatedWeight, calories, macros {protein, carbs, fat, fiber},
  healthScore (0-100), pros[], cons[], tips[], processingLevel, allergens[].
  Idioma: Português Brasileiro.
  `;

  // Continue com o seu código de manipulação da imagem ou texto...
};
