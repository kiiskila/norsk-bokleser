import { RequestHandler, Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const db = new PrismaClient({
  log: ["error", "info", "query", "warn"],
  datasources: {
    db: {
      url: "postgres://postgres:postgres@host.docker.internal:5432/norsk_bokleser",
    },
  },
});

const apiKey = `${process.env.DEEPL_KEY}`;
const sourceLanguage = "NB"; // Norwegian (Bokmål)
const targetLanguage = "EN-US"; // English (American)

export const getTranslation: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const textToTranslate = req.params.preTranslatedText;
    const translatedText = await translateText(textToTranslate);

    res.status(200).json(translatedText.translations[0].text);
  } catch (error) {
    console.log("error");
  }
};

async function translateText(text: string): Promise<any> {
  const url = "https://api-free.deepl.com/v2/translate";

  try {
    const response = await axios.post(url, null, {
      params: {
        auth_key: apiKey,
        text: text,
        source_lang: sourceLanguage,
        target_lang: targetLanguage,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error calling DeepL API:", error);
    throw error;
  }
}
