import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import en from "./en/translation.json";
import vn from "./vn/translation.json";

export const defaultNS = "translation";

i18n
  .use(Backend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: en,
      },
      vn: {
        translation: vn,
      },
    },
    defaultNS,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
