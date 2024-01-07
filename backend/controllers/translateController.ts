import { RequestHandler } from "express";
import { useGoogleTranslate } from "../services/translationService";

export const getTranslation: RequestHandler = async (req, res, next) => {
  try {
    const { textToTranslate } = req.body;

    const translatedText = await useGoogleTranslate(textToTranslate);

    res.status(200).json({ translatedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
