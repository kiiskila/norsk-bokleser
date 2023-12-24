import axios from "axios";

const apiKey = process.env.DEEPL_KEY;
const sourceLanguage = "NB"; // Norwegian (Bokmål)
const targetLanguage = "EN-US"; // English (American)

export async function translateText(text: string): Promise<string> {
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

    return response.data.translations[0].text;
  } catch (error) {
    console.error("Error calling DeepL API:", error);
    throw new Error("Translation service failed");
  }
}
