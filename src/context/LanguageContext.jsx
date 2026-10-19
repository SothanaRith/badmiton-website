import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem('smashzone_lang');
      if (saved === 'km' || saved === 'en') return saved;
    } catch {
      // Fallback
    }
    return 'en';
  });

  const setLang = useCallback((newLang) => {
    if (newLang !== 'en' && newLang !== 'km') return;
    setLangState(newLang);
    try {
      localStorage.setItem('smashzone_lang', newLang);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'en' ? 'km' : 'en');
  }, [lang, setLang]);

  // Synchronize <html> attributes and class for styling
  useEffect(() => {
    document.documentElement.lang = lang;
    if (lang === 'km') {
      document.documentElement.classList.add('lang-km');
    } else {
      document.documentElement.classList.remove('lang-km');
    }
  }, [lang]);

  // Translation lookup with token interpolation (e.g., {{count}})
  const t = useCallback(
    (key, params) => {
      const dict = translations[lang] || translations.en;
      let text = dict[key] ?? translations.en[key] ?? key;

      if (params && typeof params === 'object') {
        Object.entries(params).forEach(([paramKey, paramVal]) => {
          text = text.replace(new RegExp(`\\{\\{${paramKey}\\}\\}`, 'g'), String(paramVal));
        });
      }
      return text;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
