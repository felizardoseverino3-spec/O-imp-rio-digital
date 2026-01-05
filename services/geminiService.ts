
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateJobDescription(title: string, requirements: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Escreva uma descrição profissional e atraente para uma vaga de emprego ou micro-tarefa com o título: "${title}". Requisitos informados: "${requirements}". O tom deve ser profissional, direto e adequado para a plataforma "O Império Digital".`,
  });
  return response.text;
}

export async function getMarketInsights(query: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Como assistente do Império Digital, analise a seguinte consulta de mercado para Moçambique: "${query}". Forneça insights rápidos e estratégicos.`,
  });
  return response.text;
}

export async function getInvestmentAdvice(amount: number, period: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Como consultor financeiro do Império Digital focado em jovens moçambicanos, dê 3 dicas práticas para quem quer investir ${amount} MT por ${period}. Seja motivador, mencione a realidade local e como reinvestir pequenos ganhos para crescer.`,
  });
  return response.text;
}

export async function getInfrastructureAnalysis(sector: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analise o impacto socioeconômico e o retorno esperado de investimentos no setor de "${sector}" em Moçambique. Considere a escassez de recursos, a demanda da população e como o "Império Digital" pode facilitar esse investimento para o cidadão comum.`,
  });
  return response.text;
}

export async function getGlobalExpansionAnalysis(sector: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analise o potencial de expansão internacional para o setor de "${sector}" a partir de Moçambique. Identifique 3 mercados promissores (ex: PALOP, SADC) e que tipo de dados investigadores internacionais estariam buscando neste ecossistema.`,
  });
  return response.text;
}

export async function getPublicServiceAdvice(type: 'saude' | 'educacao' | 'media', query: string) {
  const instructions = {
    saude: "Você é um assistente de triagem de saúde. Analise os sintomas e sugira o tipo de médico em Moçambique, sempre reforçando que deve ir ao hospital.",
    educacao: "Você é um tutor acadêmico. Sugira um plano de estudo rápido para o tema fornecido.",
    media: "Você é um produtor de TV. Dê 3 ideias de conteúdo viral para um programa de TV moçambicano baseado no tema."
  };
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `${instructions[type]} Consulta: "${query}"`,
  });
  return response.text;
}

export async function getImportExportAnalysis(product: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Como especialista em Comércio Exterior do Império Digital, analise a viabilidade de importar "${product}" para Moçambique. Considere: 1. Demanda atual no mercado local. 2. Potenciais origens (ex: China, África do Sul). 3. Complexidade aduaneira básica. Forneça um resumo executivo.`,
  });
  return response.text;
}
