import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import translationDE from './locales/de/translation.json';
import translationDECH from './locales/de-ch/translation.json';
import translationPL from './locales/pl/translation.json';
import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';
import translationES from './locales/es/translation.json';
import translationIT from './locales/it/translation.json';

// Configure i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      de: {
        translation: translationDE
      },
      'de-ch': {
        translation: translationDECH
      },
      pl: {
        translation: translationPL
      },
      en: {
        translation: translationEN
      },
      fr: {
        translation: translationFR
      },
      es: {
        translation: translationES
      },
      it: {
        translation: translationIT
      }
    },
    lng: 'de',
    fallbackLng: 'de',
    interpolation: {
      escapeValue: false // React already safes from XSS
    }
  });

export default i18n;