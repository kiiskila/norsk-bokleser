import { RequestHandler } from "express";
import { useGoogleTranslate } from "../services/translationService";

/**
 * getTranslation is a RequestHandler that handles the translation of text.
 * It uses the Google Translate API to translate the text provided in the request body.
 *
 * It responds with the translated text if successful, otherwise it handles the errors.
 */
export const getTranslation: RequestHandler = async (req, res, next) => {
  try {
    // Extract the text to translate from the request body
    const { textToTranslate } = req.body;

    // Use the Google Translate API to translate the text
    const translatedText = await useGoogleTranslate(textToTranslate);

    // Respond with the translated text
    res.status(200).json({ translatedText });
  } catch (error) {
    // Log the error and respond with a generic error message
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
