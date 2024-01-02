import { RequestHandler } from "express";
import { translateText } from "../services/translationService";

export const getTranslation: RequestHandler = async (req, res, next) => {
  try {
    const { textToTranslate } = req.body;

    const translatedText = await translateText(textToTranslate);

    res.status(200).json({ translatedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
