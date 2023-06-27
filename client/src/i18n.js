import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importing translation files
import translationTM from "./lang/tm/translation.json";
import translationEN from "./lang/en/translation.json";
import translationRU from "./lang/ru/translation.json";


//Creating object with the variables of imported translation files
const resources = {
    tm: {
        translation: translationTM,
    },
    en: {
        translation: translationEN,
    },
    ru: {
        translation: translationRU,
    },
};

//i18N Initialization
i18n.use(initReactI18next).init({
    resources,
    lng: "tm", //default language
    keySeparator: false,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;