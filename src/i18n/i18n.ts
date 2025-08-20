import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import { pl } from "./translations/pl";
import { en } from "./translations/en";
import { de } from "./translations/de";

// Local fallback resources
export const resources = {
  pl: { translation: pl },
  en: { translation: en },
  de: { translation: de },
};

if (!i18n.isInitialized) {
  i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
      compatibilityJSON: "v4",
      lng: "pl",
      fallbackLng: "en",
      resources,
      backend: {
        // Expecting API to serve /i18n/<lng>.json
        loadPath: "/api/i18n/{{lng}}.json",
        parse: (data: any) => {
          try {
            const json = JSON.parse(data);
            if (json && json.translations) return json.translations; // unwrap custom shape
            return json;
          } catch (e) {
            return data;
          }
        },
      },
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
}

export default i18n;
