import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSwitcher({ variant = 'compact', onSelect }) {
  const { lang, setLang } = useLanguage();

  const handleSelect = (nextLang) => {
    setLang(nextLang);
    if (onSelect) onSelect(nextLang);
  };

  if (variant === 'full') {
    return (
      <div className="language-switcher-full">
        <button
          type="button"
          onClick={() => handleSelect('en')}
          className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
          aria-pressed={lang === 'en'}
        >
          English (EN)
        </button>
        <button
          type="button"
          onClick={() => handleSelect('km')}
          className={`lang-btn font-khmer ${lang === 'km' ? 'active' : ''}`}
          aria-pressed={lang === 'km'}
        >
          ភាសាខ្មែរ (KM)
        </button>
      </div>
    );
  }

  return (
    <div className="language-switcher-compact" aria-label="Language switcher">
      <Globe size={13} className="lang-globe-icon text-accent" />
      <button
        type="button"
        onClick={() => handleSelect('en')}
        className={`lang-toggle-btn ${lang === 'en' ? 'active' : ''}`}
        aria-pressed={lang === 'en'}
        title="Switch to English"
      >
        EN
      </button>
      <span className="lang-divider">|</span>
      <button
        type="button"
        onClick={() => handleSelect('km')}
        className={`lang-toggle-btn font-khmer ${lang === 'km' ? 'active' : ''}`}
        aria-pressed={lang === 'km'}
        title="ប្តូរទៅភាសាខ្មែរ"
      >
        ខ្មែរ
      </button>
    </div>
  );
}
