import React from 'react';
import { Home, Layers, Scale, Heart, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function MobileBottomNav({ 
  cartCount, 
  wishlistCount, 
  compareCount, 
  onOpenCart, 
  onOpenWishlist, 
  onOpenCompare,
  onScrollToSection
}) {
  const { t, lang } = useLanguage();

  return (
    <nav className="mobile-bottom-nav">
      <button 
        className="mobile-nav-btn active"
        onClick={() => onScrollToSection('hero')}
      >
        <Home size={20} />
        <span>{lang === 'km' ? 'ទំព័រដើម' : 'Home'}</span>
      </button>

      <button 
        className="mobile-nav-btn"
        onClick={() => onScrollToSection('categories')}
      >
        <Layers size={20} />
        <span>{lang === 'km' ? 'ប្រភេទ' : 'Categories'}</span>
      </button>

      <button 
        className={`mobile-nav-btn ${compareCount > 0 ? 'highlight-active' : ''}`}
        onClick={onOpenCompare}
      >
        <div className="mobile-icon-badge-wrap">
          <Scale size={20} />
          {compareCount > 0 && <span className="mobile-badge">{compareCount}</span>}
        </div>
        <span>{t('nav.compare')}</span>
      </button>

      <button 
        className="mobile-nav-btn"
        onClick={onOpenWishlist}
      >
        <div className="mobile-icon-badge-wrap">
          <Heart size={20} />
          {wishlistCount > 0 && <span className="mobile-badge">{wishlistCount}</span>}
        </div>
        <span>{t('nav.wishlist')}</span>
      </button>

      <button 
        className="mobile-nav-btn"
        onClick={onOpenCart}
      >
        <div className="mobile-icon-badge-wrap">
          <ShoppingBag size={20} />
          {cartCount > 0 && <span className="mobile-badge cart-color">{cartCount}</span>}
        </div>
        <span>{t('nav.cart')}</span>
      </button>
    </nav>
  );
}
