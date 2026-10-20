import React, { useState, useRef, useEffect } from 'react';
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
  Flame,
  User,
  LogOut,
  Wrench
} from 'lucide-react';
import { BadmintonIcon } from './BadmintonIcon';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ 
  cartCount, 
  wishlistCount, 
  compareItems, 
  onOpenCart, 
  onOpenWishlist, 
  onOpenCompare,
  onOpenAdmin,
  onOpenTrackOrder,
  onOpenAuth,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onScrollToSection
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const { t, lang } = useLanguage();
  const { currentUser, logout, isAdmin, isSuperAdmin } = useAuth();

  // Close user dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="navbar-wrapper modern-single-nav">
      <div className="container nav-single-container">
        {/* Brand Logo */}
        <div className="brand-logo" onClick={() => onScrollToSection('hero')}>
          <div className="logo-icon">
            <BadmintonIcon size={26} color="#ff9900" />
          </div>
          <div className="logo-text">
            <span className="brand-name">SMASH<span className="accent-orange">ZONE</span></span>
            <span className="brand-tagline">PRO STORE</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav-links">
          <button 
            className={`nav-link-btn ${selectedCategory === 'rackets' ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory('rackets');
              onScrollToSection('specs-filter');
            }}
          >
            {t('nav.rackets')}
          </button>
          <button 
            className={`nav-link-btn ${selectedCategory === 'shoes' ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory('shoes');
              onScrollToSection('products');
            }}
          >
            {t('nav.shoes')}
          </button>
          <button 
            className={`nav-link-btn ${selectedCategory === 'shuttles' ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory('shuttles');
              onScrollToSection('products');
            }}
          >
            {t('nav.shuttles')}
          </button>
          <button 
            className={`nav-link-btn ${selectedCategory === 'bags' ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory('bags');
              onScrollToSection('products');
            }}
          >
            {t('nav.bags')}
          </button>
          <button 
            className="nav-link-btn nav-link-highlight"
            onClick={() => onScrollToSection('specs-filter')}
          >
            <Sparkles size={14} className="text-orange" />
            <span>{t('nav.racketLab')}</span>
          </button>
        </nav>

        {/* Search input */}
        <div className="navbar-search modern-search">
          <input 
            type="text" 
            className="search-input"
            placeholder={t('nav.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-submit-btn" aria-label="Search equipment">
            <Search size={16} />
          </button>
        </div>

        {/* Right Actions: Lang Switcher, User Auth, Track, Wishlist, Compare, Cart */}
        <div className="navbar-actions modern-actions">
          {/* Language Switcher */}
          <LanguageSwitcher variant="compact" />

          {/* User Auth Profile Button */}
          {!currentUser ? (
            <button 
              className="action-auth-btn"
              onClick={() => onOpenAuth('login')}
              title={t('auth.login')}
            >
              <User size={17} />
              <span className="auth-btn-text">{t('auth.login')}</span>
            </button>
          ) : (
            <div className="user-profile-menu-wrap" ref={userMenuRef}>
              <button 
                className="user-profile-pill-btn"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                aria-label="User account menu"
              >
                <div className="user-avatar-circle">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="user-display-name">{currentUser.name.split(' ')[0]}</span>
                {isAdmin && (
                  <span className={`role-badge ${isSuperAdmin ? 'role-super' : 'role-admin'}`}>
                    {isSuperAdmin ? 'SUPER' : 'ADMIN'}
                  </span>
                )}
                <ChevronDown size={14} className="user-arrow" />
              </button>

              {userMenuOpen && (
                <div className="user-dropdown-menu animate-slide-down">
                  <div className="dropdown-user-info">
                    <span className="dropdown-name">{currentUser.name}</span>
                    <span className="dropdown-email">{currentUser.email}</span>
                    <span className={`dropdown-role-tag ${isSuperAdmin ? 'role-super' : (isAdmin ? 'role-admin' : 'role-customer')}`}>
                      {isSuperAdmin ? t('auth.roleSuperAdmin') : (isAdmin ? t('auth.roleAdmin') : t('auth.roleCustomer'))}
                    </span>
                  </div>

                  <div className="dropdown-divider"></div>

                  {/* ONLY SHOW ADMIN PORTAL IF ROLE IS ADMIN OR SUPER ADMIN! */}
                  {isAdmin && (
                    <button 
                      className="dropdown-item dropdown-admin-item"
                      onClick={() => {
                        setUserMenuOpen(false);
                        onOpenAdmin();
                      }}
                    >
                      <ShieldCheck size={16} className="text-orange" />
                      <span>{t('nav.adminPortal')}</span>
                    </button>
                  )}

                  <button 
                    className="dropdown-item"
                    onClick={() => {
                      setUserMenuOpen(false);
                      onOpenTrackOrder();
                    }}
                  >
                    <Truck size={16} />
                    <span>{t('auth.myOrders')}</span>
                  </button>

                  <button 
                    className="dropdown-item text-red"
                    onClick={() => {
                      setUserMenuOpen(false);
                      logout();
                    }}
                  >
                    <LogOut size={16} />
                    <span>{t('auth.logout')}</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Track order */}
          <button 
            className="action-icon-btn" 
            onClick={onOpenTrackOrder}
            title={t('nav.trackOrder')}
            aria-label="Track order"
          >
            <Truck size={19} />
          </button>

          {/* Compare */}
          {compareItems.length > 0 && (
            <button 
              className="action-icon-btn compare-icon-btn active"
              onClick={onOpenCompare}
              title={t('nav.compare')}
            >
              <Scale size={19} />
              <span className="badge-count">{compareItems.length}</span>
            </button>
          )}

          {/* Wishlist */}
          <button 
            className="action-icon-btn"
            onClick={onOpenWishlist}
            title={t('nav.wishlist')}
            aria-label="Wishlist"
          >
            <Heart size={19} />
            {wishlistCount > 0 && (
              <span className="badge-count">{wishlistCount}</span>
            )}
          </button>

          {/* Cart */}
          <button 
            className="action-pill-btn cart-pill-btn"
            onClick={onOpenCart}
            title={t('nav.cart')}
          >
            <ShoppingCart size={18} />
            <span className="cart-pill-count">{cartCount}</span>
          </button>

          {/* Mobile hamburger */}
          <button 
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer animate-slide-down">
          {/* User status in mobile drawer */}
          <div className="mobile-auth-strip">
            {!currentUser ? (
              <button 
                className="btn btn-primary btn-full-width"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('login');
                }}
              >
                <User size={16} />
                <span>{t('auth.login')} / {t('auth.register')}</span>
              </button>
            ) : (
              <div className="mobile-logged-user">
                <div>
                  <strong>{currentUser.name}</strong>
                  <div className="text-muted text-xs">{currentUser.email}</div>
                </div>
                <button 
                  className="btn btn-sm btn-outline text-red"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                >
                  <LogOut size={14} />
                  <span>{t('auth.logout')}</span>
                </button>
              </div>
            )}
          </div>

          <div className="mobile-nav-search">
            <input 
              type="text" 
              className="search-input"
              placeholder={t('nav.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-submit-btn"><Search size={16} /></button>
          </div>
          <div className="mobile-links-list">
            <button 
              className="mobile-link-item"
              onClick={() => {
                setSelectedCategory('rackets');
                onScrollToSection('specs-filter');
                setMobileMenuOpen(false);
              }}
            >
              {t('nav.rackets')}
            </button>
            <button 
              className="mobile-link-item"
              onClick={() => {
                setSelectedCategory('shoes');
                onScrollToSection('products');
                setMobileMenuOpen(false);
              }}
            >
              {t('nav.shoes')}
            </button>
            <button 
              className="mobile-link-item"
              onClick={() => {
                setSelectedCategory('shuttles');
                onScrollToSection('products');
                setMobileMenuOpen(false);
              }}
            >
              {t('nav.shuttles')}
            </button>
            <button 
              className="mobile-link-item"
              onClick={() => {
                setSelectedCategory('bags');
                onScrollToSection('products');
                setMobileMenuOpen(false);
              }}
            >
              {t('nav.bags')}
            </button>
            <button 
              className="mobile-link-item highlight"
              onClick={() => {
                onScrollToSection('specs-filter');
                setMobileMenuOpen(false);
              }}
            >
              <Sparkles size={16} className="text-orange" />
              <span>{t('nav.racketLab')}</span>
            </button>
            <button 
              className="mobile-link-item"
              onClick={() => {
                onOpenTrackOrder();
                setMobileMenuOpen(false);
              }}
            >
              <Truck size={16} />
              <span>{t('nav.trackOrder')}</span>
            </button>

            {/* ONLY SHOW ADMIN IN MOBILE IF USER IS ADMIN OR SUPERADMIN */}
            {isAdmin && (
              <button 
                className="mobile-link-item text-orange font-bold"
                onClick={() => {
                  onOpenAdmin();
                  setMobileMenuOpen(false);
                }}
              >
                <ShieldCheck size={16} />
                <span>{t('nav.adminPortal')}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
