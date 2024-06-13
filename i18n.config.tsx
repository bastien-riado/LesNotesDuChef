import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: require('./src/assets/locales/language-en.json'),
  },
  fr: {
    translation: require('./src/assets/locales/language-fr.json'),
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
