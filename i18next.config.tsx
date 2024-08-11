import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: require('./src/assets/locales/language-en.json'),
  },
  fr: {
    translation: require('./src/assets/locales/language-fr.json'),
  },
  es: {
    translation: require('./src/assets/locales/language-es.json'),
  },
  de: {
    translation: require('./src/assets/locales/language-de.json'),
  },
  it: {
    translation: require('./src/assets/locales/language-it.json'),
  },
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
