import axios from "axios";
const translateGoogle = require("translate-google");

// API key for DeepL translation service, fetched from environment variables
const apiKey = process.env.DEEPL_KEY;
// Source language code (Norwegian Bokmål)
const sourceLanguage = "NB";
// Target language code (American English)
const targetLanguage = "EN-US";

// Cache object to store translations from both DeepL and Google Translate services
const translationCache: { [key: string]: string } = {};

/**
 * Translates text from Norwegian Bokmål to English using DeepL API.
 *
 * @param {string} text - The text to be translated.
 * @returns {Promise<string>} - The translated text.
 * @throws - Throws an error if the DeepL API call fails.
 */
export async function useDeepLTranslate(text: string): Promise<string> {
  // Create a unique cache key
  const cacheKey = `DeepL-${text}-${targetLanguage}`;

  // Return cached translation if available
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

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

    // Extract and cache the translated text
    const translatedText = response.data.translations[0].text;
    translationCache[cacheKey] = translatedText;

    return translatedText;
  } catch (error) {
    console.error("Error calling DeepL API:", error);
    throw new Error("DeepL Translation service failed");
  }
}

/**
 * Translates text from Norwegian to English using Google Translate.
 *
 * @param {string} text - The text to be translated.
 * @returns {Promise<string>} - The translated text.
 * @throws - Throws an error if the Google Translate call fails.
 */
export async function useGoogleTranslate(text: string): Promise<string> {
  // Create a unique cache key
  const cacheKey = `Google-${text}-en`;

  // Return cached translation if available
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  try {
    const translatedText = await translateGoogle(text, {
      from: "no",
      to: "en",
    });

    // Cache the translated text
    translationCache[cacheKey] = translatedText;
    return translatedText;
  } catch (error) {
    console.error("Error using Google Translate:", error);
    throw new Error("Google Translate service failed");
  }
}
