import React, { useState } from 'react';
import { X, Star, ShoppingCart, ShieldCheck, Scale, Wrench } from 'lucide-react';
import { PRODUCTS, STRING_OPTIONS } from '../data/badmintonData';
import { useLanguage } from '../context/LanguageContext';

export default function QuickViewModal({ productId, onClose, onAddToCart }) {
  const { t, lang } = useLanguage();

  if (!productId) return null;

  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return null;

  const [selectedString, setSelectedString] = useState(STRING_OPTIONS[0].name);
  const [tension, setTension] = useState(26);

  const handleAddWithSpecs = () => {
    onAddToCart(product.id, {
      selectedString: product.category === 'rackets' ? selectedString : null,
      stringTension: product.category === 'rackets' ? tension : null
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container quickview-modal animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="quickview-grid">
          {/* Left Column: Image */}
          <div className="quickview-img-col">
            <div className="quickview-img-box">
              <img src={product.image} alt={product.name} className="quickview-img" />
              {product.badge && (
                <span className="quickview-badge">{product.badge}</span>
              )}
            </div>
          </div>

          {/* Right Column: Specs & Customization */}
          <div className="quickview-info-col">
            <span className="quickview-brand">{product.brand}</span>
            <h2 className="quickview-title">{product.name}</h2>

            <div className="quickview-rating-row">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={15} 
                    fill={i < Math.floor(product.rating) ? '#ff9900' : 'none'} 
                    color="#ff9900" 
                  />
                ))}
              </div>
              <span className="rating-score">{product.rating}</span>
              <span className="rating-count">({product.reviewsCount} {lang === 'km' ? 'ការវាយតម្លៃពីអ្នកលេង' : 'verified player reviews'})</span>
            </div>

            <div className="quickview-pricing">
              <span className="current-price">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="old-price">${product.originalPrice.toFixed(2)}</span>
              )}
              <span className="stock-tag in-stock">{lang === 'km' ? 'មានក្នុងស្តុក • រួចរាល់សម្រាប់ដាក់ខ្សែ' : 'In Stock • Ready to String'}</span>
            </div>

            <p className="quickview-desc">{product.description}</p>

            {/* Racket Custom Restringing Options */}
            {product.category === 'rackets' && (
              <div className="stringing-customizer-box">
                <div className="customizer-title">
                  <Wrench size={16} className="text-orange" />
                  <span>{lang === 'km' ? 'ការកំណត់កម្លាំងទាញខ្សែរ៉ាកែត' : 'Custom Stringing Specification'}</span>
                </div>

                <div className="customizer-field">
                  <label className="field-label">{t('quickview.selectString')}:</label>
                  <select 
                    className="custom-select"
                    value={selectedString}
                    onChange={(e) => setSelectedString(e.target.value)}
                  >
                    {STRING_OPTIONS.map(str => (
                      <option key={str.name} value={str.name}>
                        {str.name} {str.price > 0 ? `(+$${str.price.toFixed(2)})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="customizer-field">
                  <div className="tension-label-row">
                    <label className="field-label">{t('quickview.customTension')}:</label>
                    <span className="tension-display">{tension} lbs</span>
                  </div>
                  <input 
                    type="range" 
                    min="22" 
                    max="30" 
                    value={tension}
                    onChange={(e) => setTension(Number(e.target.value))}
                    className="tension-slider"
                  />
                  <div className="tension-ticks">
                    <span>22 lbs ({lang === 'km' ? 'ទន់គ្រប់គ្រង' : 'Control'})</span>
                    <span>26 lbs ({lang === 'km' ? 'ស្តង់ដារក្លឹប' : 'Club Pro'})</span>
                    <span>30 lbs ({lang === 'km' ? 'កម្រិតប្រកួត' : 'Tournament'})</span>
                  </div>
                </div>
              </div>
            )}

            {/* Specs Breakdown */}
            {product.specs && product.category === 'rackets' && (
              <div className="quickview-specs-table">
                <div className="spec-item">
                  <span className="spec-k">{t('quickview.balance')}:</span>
                  <span className="spec-v">{product.specs.balance}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-k">{t('quickview.flex')}:</span>
                  <span className="spec-v">{product.specs.flex}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-k">{t('quickview.weight')}:</span>
                  <span className="spec-v">{product.specs.weightGrip}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-k">{t('quickview.maxTension')}:</span>
                  <span className="spec-v">{product.specs.tensionMax}</span>
                </div>
              </div>
            )}

            {/* Add to cart action */}
            <div className="quickview-cta-box">
              <button className="btn btn-primary btn-lg" onClick={handleAddWithSpecs}>
                <ShoppingCart size={18} />
                <span>{t('product.addToCart')} - ${(product.price).toFixed(2)}</span>
              </button>
            </div>

            <div className="quickview-trust-row">
              <ShieldCheck size={14} className="text-green" />
              <span>{lang === 'km' ? 'ធានាដូរវិញក្នុង ៣០ ថ្ងៃ • ក្រិតកម្លាំងខ្សែម៉ាស៊ីនអេឡិចត្រូនិចត្រឹមត្រូវ' : 'Free returns within 30 days • Certified electronic string tension guaranteed'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
