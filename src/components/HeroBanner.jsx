import { Star, ShieldCheck, ArrowRight, Zap, ChevronRight, Heart, Wrench, Footprints } from 'lucide-react';
import { QUICK_RECOMMENDATIONS } from '../data/badmintonData';
import { BadmintonIcon } from './BadmintonIcon';
import { useLanguage } from '../context/LanguageContext';

export default function HeroBanner({ onAddToCart, onQuickView, onExploreRackets, onOpenSpecsLab }) {
  const { t, lang } = useLanguage();
  const heroProduct = {
    id: 'yonex-astrox-100zz',
    name: 'Yonex Astrox 100 ZZ Kurenai',
    brand: 'Yonex Pro Series',
    price: 249.00,
    originalPrice: 295.00,
    rating: 4.9,
    reviews: 1180,
    discount: '15% OFF',
    image: '/images/hero-racket.jpg',
    specsSummary: 'Hyper Slim Shaft • Rotational Generator System • 4U/G5'
  };

  const getRecIcon = (type) => {
    switch (type) {
      case 'zap': return <Zap size={16} className="text-orange" />;
      case 'heart': return <Heart size={16} fill="#ef4444" color="#ef4444" />;
      case 'shoes': return <Footprints size={16} className="text-accent" />;
      case 'shuttle': return <BadmintonIcon size={16} color="#0284c7" />;
      case 'wrench': return <Wrench size={16} className="text-orange" />;
      default: return <Zap size={16} />;
    }
  };

  return (
    <section className="hero-section">
      <div className="container">
        {/* Main Hero Card */}
        <div className="hero-card">
          <div className="hero-grid">
            {/* Left Content */}
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-pulse"></span>
                <span>{t('hero.badge')}</span>
              </div>

              <h1 className="hero-title">
                {t('hero.titleLine1')} <br />
                <span className="hero-title-highlight">{t('hero.titleLine2')}</span>
              </h1>

              <p className="hero-description">
                {t('hero.subtitle')}
              </p>

              <div className="hero-actions">
                <button 
                  className="btn btn-primary"
                  onClick={onExploreRackets}
                >
                  <span>{t('hero.exploreCatalog')}</span>
                  <ArrowRight size={18} />
                </button>

                <button 
                  className="btn btn-outline"
                  onClick={onOpenSpecsLab}
                >
                  <Zap size={16} />
                  <span>{t('specs.compareBtn')}</span>
                </button>
              </div>

              {/* Trust markers */}
              <div className="hero-trust-bar">
                <div className="trust-item">
                  <ShieldCheck size={16} className="text-accent" />
                  <span>100% Genuine Certified</span>
                </div>
                <div className="trust-item">
                  <span className="dot-sep">•</span>
                  <span>Free Stringing Above $199</span>
                </div>
                <div className="trust-item">
                  <span className="dot-sep">•</span>
                  <span>BWF Standard Approved</span>
                </div>
              </div>
            </div>

            {/* Right Featured Product Showcase */}
            <div className="hero-showcase">
              <div className="showcase-badge">{heroProduct.discount}</div>

              <div className="showcase-image-container">
                <img 
                  src={heroProduct.image} 
                  alt={heroProduct.name} 
                  className="showcase-product-img"
                />
              </div>

              <div className="showcase-details">
                <span className="showcase-brand">{heroProduct.brand}</span>
                <h3 className="showcase-title">{heroProduct.name}</h3>

                <div className="showcase-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="#ff9900" color="#ff9900" />
                    ))}
                  </div>
                  <span className="rating-score">4.9</span>
                  <span className="rating-count">({heroProduct.reviews} reviews)</span>
                </div>

                <div className="showcase-specs-pill">
                  {heroProduct.specsSummary}
                </div>

                <div className="showcase-price-row">
                  <div className="price-box">
                    <span className="current-price">${heroProduct.price.toFixed(2)}</span>
                    <span className="old-price">${heroProduct.originalPrice.toFixed(2)}</span>
                  </div>

                  <div className="showcase-buttons">
                    <button 
                      className="btn-quick-view"
                      onClick={() => onQuickView(heroProduct.id)}
                    >
                      {t('product.quickView')}
                    </button>
                    <button 
                      className="btn-showcase-add"
                      onClick={() => onAddToCart(heroProduct.id)}
                    >
                      {t('product.addToCart')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Quick-Access Recommendations Bar (Matches template) */}
          <div className="hero-recommendations-bar">
            <div className="recommendations-header">
              <span className="rec-avatar-icon">
                <BadmintonIcon size={24} color="#ff9900" />
              </span>
              <div className="rec-user-text">
                <span className="rec-greeting">{lang === 'km' ? 'សួស្តី អ្នកវាយសី' : 'Hi, Smash Player'}</span>
                <span className="rec-sub">{lang === 'km' ? 'ការណែនាំពិសេសសម្រាប់ការលេងរបស់អ្នក' : 'Smart recommendations for your game'}</span>
              </div>
            </div>

            <div className="recommendations-scroll">
              {QUICK_RECOMMENDATIONS.map((rec) => (
                <div 
                  key={rec.id} 
                  className="rec-pill-card"
                  onClick={onExploreRackets}
                >
                  <span className="rec-icon">{getRecIcon(rec.iconType)}</span>
                  <div className="rec-info">
                    <span className="rec-title">{lang === 'km' && rec.titleKm ? rec.titleKm : rec.title}</span>
                    <span className="rec-badge">{lang === 'km' && rec.subtitleKm ? rec.subtitleKm : rec.subtitle}</span>
                  </div>
                  <ChevronRight size={15} className="rec-arrow" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
