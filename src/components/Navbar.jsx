import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  MapPin, 
  Scale, 
  ChevronDown, 
  Menu, 
  X,
  Sparkles,
  PhoneCall,
  ShieldCheck,
  Truck,
  Flame
} from 'lucide-react';
import { BadmintonIcon } from './BadmintonIcon';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ 
  cartCount, 
  wishlistCount, 
  compareItems, 
  onOpenCart, 
  onOpenWishlist, 
  onOpenCompare,
  onOpenAdmin,
  onOpenTrackOrder,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onScrollToSection
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, lang } = useLanguage();

  return (
    <header className="navbar-wrapper">
      {/* Top utility strip */}
      <div className="navbar-top-strip">
        <div className="container strip-content">
          <div className="strip-left">
            <span className="strip-item">
              <MapPin size={13} className="text-accent" />
              <span>{t('nav.deliverTo')}: <strong>{t('nav.defaultLocation')}</strong></span>
            </span>
            <span className="strip-divider">|</span>
            <span className="strip-item">
              <PhoneCall size={13} />
              <span>{t('nav.hotline')}: <strong>+855 23 999 888</strong></span>
            </span>
          </div>
          <div className="strip-right">
            {/* Bilingual Language Switcher EN | ខ្មែរ */}
            <LanguageSwitcher variant="compact" />
            <span className="strip-divider">|</span>
            <span className="strip-item badge-pill">
              <Sparkles size={12} />
              <span>{t('nav.freeRestringPromo')}</span>
            </span>
            <span className="strip-divider">|</span>
            <button className="strip-item cursor-pointer text-hover-white" onClick={onOpenTrackOrder}>
              <Truck size={13} />
              <span>{t('nav.trackOrder')}</span>
            </button>
            <span className="strip-divider">|</span>
            <button className="strip-item cursor-pointer badge-admin-portal" onClick={onOpenAdmin}>
              <ShieldCheck size={13} className="text-orange" />
              <span>{t('nav.adminPortal')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="navbar-main">
        <div className="container main-content">
          {/* Brand Logo */}
          <div className="brand-logo" onClick={() => onScrollToSection('hero')}>
            <div className="logo-icon">
              <BadmintonIcon size={26} color="#ff9900" />
            </div>
            <div className="logo-text">
              <span className="brand-name">SMASH<span className="accent-orange">ZONE</span></span>
              <span className="brand-tagline">PRO BADMINTON STORE</span>
            </div>
          </div>

          {/* Search bar with category dropdown */}
          <div className="navbar-search">
            <div className="search-category-select">
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Filter by category"
              >
                <option value="all">{t('nav.allGear')}</option>
                <option value="rackets">{t('nav.rackets')}</option>
                <option value="shoes">{t('nav.shoes')}</option>
                <option value="shuttles">{t('nav.shuttles')}</option>
                <option value="bags">{t('nav.bags')}</option>
                <option value="accessories">{t('nav.accessories')}</option>
              </select>
              <ChevronDown size={14} className="category-arrow" />
            </div>

            <input 
              type="text" 
              className="search-input"
              placeholder={t('nav.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button className="search-submit-btn" aria-label="Search equipment">
              <Search size={18} />
            </button>
          </div>

          {/* User actions */}
          <div className="navbar-actions">
            {/* Compare items badge */}
            <button 
              className={`action-btn compare-btn ${compareItems.length > 0 ? 'active' : ''}`}
              onClick={onOpenCompare}
              title={t('nav.compare')}
            >
              <div className="icon-wrapper">
                <Scale size={20} />
                {compareItems.length > 0 && (
                  <span className="badge-count compare-count">{compareItems.length}</span>
                )}
              </div>
              <div className="action-text">
                <span className="action-sub">Specs</span>
                <span className="action-main">{t('nav.compare')}</span>
              </div>
            </button>

            {/* Wishlist */}
            <button 
              className="action-btn"
              onClick={onOpenWishlist}
              title={t('nav.wishlist')}
            >
              <div className="icon-wrapper">
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="badge-count wishlist-count">{wishlistCount}</span>
                )}
              </div>
              <div className="action-text">
                <span className="action-sub">{t('nav.wishlist')}</span>
                <span className="action-main">{wishlistCount > 0 ? `${wishlistCount}` : '0'}</span>
              </div>
            </button>

            {/* Cart */}
            <button 
              className="action-btn cart-btn"
              onClick={onOpenCart}
              title={t('nav.cart')}
            >
              <div className="icon-wrapper">
                <ShoppingCart size={22} />
                <span className="badge-count cart-count">{cartCount}</span>
              </div>
              <div className="action-text">
                <span className="action-sub">{t('nav.cart')}</span>
                <span className="action-main cart-total-text">
                  {cartCount > 0 ? `${cartCount} ${t('cart.items')}` : '$0.00'}
                </span>
              </div>
            </button>

            {/* Admin Portal Toggle */}
            <button 
              className="action-btn admin-portal-btn"
              onClick={onOpenAdmin}
              title={t('nav.adminPortal')}
            >
              <div className="icon-wrapper">
                <ShieldCheck size={20} className="text-orange" />
              </div>
              <div className="action-text">
                <span className="action-sub">Workshop</span>
                <span className="action-main">Admin</span>
              </div>
            </button>

            {/* Mobile menu toggle */}
            <button 
              className="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Secondary category sub-bar */}
      <nav className={`navbar-sub ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="container sub-content">
          <button 
            className="sub-link highlight-all"
            onClick={() => {
              setSelectedCategory('all');
              onScrollToSection('categories');
              setMobileMenuOpen(false);
            }}
          >
            <Menu size={16} />
            <span>{t('categories.title')}</span>
          </button>

          <button 
            className="sub-link" 
            onClick={() => {
              onScrollToSection('deals');
              setMobileMenuOpen(false);
            }}
          >
            <span className="tag-fire"><Flame size={15} color="#ef4444" /></span> {t('nav.todaysDeals')}
          </button>

          <button 
            className="sub-link"
            onClick={() => {
              setSelectedCategory('rackets');
              onScrollToSection('specs-filter');
              setMobileMenuOpen(false);
            }}
          >
            {t('nav.rackets')}
          </button>

          <button 
            className="sub-link"
            onClick={() => {
              setSelectedCategory('shoes');
              onScrollToSection('products');
              setMobileMenuOpen(false);
            }}
          >
            {t('nav.shoes')}
          </button>

          <button 
            className="sub-link"
            onClick={() => {
              setSelectedCategory('shuttles');
              onScrollToSection('products');
              setMobileMenuOpen(false);
            }}
          >
            {t('nav.shuttles')}
          </button>

          <button 
            className="sub-link"
            onClick={() => {
              setSelectedCategory('bags');
              onScrollToSection('products');
              setMobileMenuOpen(false);
            }}
          >
            {t('nav.bags')}
          </button>

          <button 
            className="sub-link highlight-compare"
            onClick={() => {
              onScrollToSection('specs-filter');
              setMobileMenuOpen(false);
            }}
          >
            <Scale size={15} />
            <span>{t('nav.racketLab')}</span>
          </button>

          <button 
            className="sub-link highlight-track"
            onClick={() => {
              onOpenTrackOrder();
              setMobileMenuOpen(false);
            }}
          >
            <Truck size={15} />
            <span>{t('nav.trackOrder')}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
