import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/badmintonData';
import { useLanguage } from '../context/LanguageContext';

export default function ShopByCategory({ onSelectCategory }) {
  const { t, lang } = useLanguage();

  return (
    <section className="shop-by-category-section" id="categories">
      <div className="container">
        <div className="section-header">
          <div className="section-title-wrap">
            <h2 className="section-title">{t('categories.title')}</h2>
            <p className="section-subtitle">{t('categories.subtitle')}</p>
          </div>
          <button 
            className="section-link-btn"
            onClick={() => onSelectCategory('all')}
          >
            <span>{t('categories.viewAll')}</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="category-grid">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.id} 
              className="category-card"
              onClick={() => onSelectCategory(cat.id)}
            >
              <div className="cat-img-box">
                <img src={cat.image} alt={cat.name} className="cat-img" />
                <span className="cat-tag">{lang === 'km' && cat.tagKm ? cat.tagKm : cat.tag}</span>
              </div>
              <div className="cat-info">
                <h3 className="cat-name">{lang === 'km' && cat.nameKm ? cat.nameKm : cat.name}</h3>
                <p className="cat-sub">{lang === 'km' && cat.subtitleKm ? cat.subtitleKm : cat.subtitle}</p>
                <div className="cat-cta">
                  <span>{lang === 'km' ? 'ស្វែងរកឥឡូវ' : 'Explore Now'}</span>
                  <ArrowRight size={14} className="cat-arrow" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
