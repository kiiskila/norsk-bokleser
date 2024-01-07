import axios from "axios";
const translate = require("translate-google");

const apiKey = process.env.DEEPL_KEY;
const sourceLanguage = "NB"; // Norwegian (Bokmål)
const targetLanguage = "EN-US"; // English (American)

// Cache object
const translationCache: { [key: string]: string } = {};

export async function useDeepLTranslate(text: string): Promise<string> {
  // Generate a unique cache key based on the text and target language
  const cacheKey = `${text}-${targetLanguage}`;

  // Check if the translation is already in the cache
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  const url = "https://api-free.deepl.com/v2/translate";

  try {
    translate(text, { from: "no", to: "en" }).then((res: any) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }

  try {
    const response = await axios.post(url, null, {
      params: {
        auth_key: apiKey,
        text: text,
        source_lang: sourceLanguage,
        target_lang: targetLanguage,
      },
    });

    // Store the translation in the cache
    const translatedText = response.data.translations[0].text;
    translationCache[cacheKey] = translatedText;

    return translatedText;
  } catch (error) {
    console.error("Error calling DeepL API:", error);
    throw new Error("Translation service failed");
  }
}

export async function useGoogleTranslate(text: string): Promise<string> {
  let translatedText = "";
  try {
    await translate(text, { from: "no", to: "en" }).then((res: any) => {
      translatedText = res;
    });
  } catch (error) {
    console.log(error);
  }
  return translatedText;
}
