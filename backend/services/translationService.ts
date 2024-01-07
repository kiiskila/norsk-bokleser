import axios from "axios";
const translateGoogle = require("translate-google");

const apiKey = process.env.DEEPL_KEY;
const sourceLanguage = "NB"; // Norwegian (Bokmål)
const targetLanguage = "EN-US"; // English (American)

// Cache object for both services
const translationCache: { [key: string]: string } = {};

export async function useDeepLTranslate(text: string): Promise<string> {
  const cacheKey = `DeepL-${text}-${targetLanguage}`;
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

    const translatedText = response.data.translations[0].text;
    translationCache[cacheKey] = translatedText;

    return translatedText;
  } catch (error) {
    console.error("Error calling DeepL API:", error);
    throw new Error("DeepL Translation service failed");
  }
}

export async function useGoogleTranslate(text: string): Promise<string> {
  const cacheKey = `Google-${text}-en`;
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  try {
    const translatedText = await translateGoogle(text, {
      from: "no",
      to: "en",
    });
    translationCache[cacheKey] = translatedText;
    return translatedText;
  } catch (error) {
    console.error("Error using Google Translate:", error);
    throw new Error("Google Translate service failed");
  }
}
