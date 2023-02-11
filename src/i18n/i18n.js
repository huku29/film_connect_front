import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "./en.json";
import translationJa from "./ja.json";

const resources = {
    ja: {
      translation: translationJa
    },
    en: {
      translation: translationEn
    }
  };

  i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: "ja", 
    interpolation: {
      escapeValue: false 
    }
  });

  export default i18n;