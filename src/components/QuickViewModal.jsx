import React, { useState } from 'react';
import { X, Star, ShoppingCart, ShieldCheck, Wrench } from 'lucide-react';
import { PRODUCTS, STRING_OPTIONS } from '../data/badmintonData';
import { useLanguage } from '../context/LanguageContext';

export default function QuickViewModal({ productId, products = PRODUCTS, onClose, onAddToCart }) {
  const { t, lang } = useLanguage();
  const [selectedString, setSelectedString] = useState(STRING_OPTIONS[0].name);
  const [tension, setTension] = useState(26);

  if (!productId) return null;

  const product = products.find(p => p.id === productId);
  if (!product) return null;

  const isOutOfStock = (product.stockCount !== undefined && product.stockCount <= 0) || product.inStock === false;

  const handleAddWithSpecs = () => {
    if (isOutOfStock) return;
    onAddToCart(product.id, {
      selectedString: product.category === 'rackets' ? selectedString : null,
      stringTension: product.category === 'rackets' ? tension : null
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container quickview-modal modern-quickview animate-slide-up" onClick={(e) => e.stopPropagation()}>
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

          {/* Right Column: Buying Options */}
          <div className="quickview-info-col">
            <div className="quickview-header-strip">
              <span className="quickview-brand">{product.brand}</span>
              {isOutOfStock ? (
                <span className="stock-tag out-of-stock">
                  {lang === 'km' ? 'ដាច់ស្តុក' : 'Out of Stock'}
                </span>
              ) : product.stockCount <= 5 ? (
                <span className="stock-tag low-stock">
                  {lang === 'km' ? `នៅសល់តែ ${product.stockCount} គ្រឿងទៀត` : `Low Stock (Only ${product.stockCount} left!)`}
                </span>
              ) : (
                <span className="stock-tag in-stock">
                  {lang === 'km' ? `មានក្នុងស្តុក (${product.stockCount})` : `In Stock (${product.stockCount})`}
                </span>
              )}
            </div>

            <h2 className="quickview-title">{product.name}</h2>

            <div className="quickview-rating-row">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    fill={i < Math.floor(product.rating) ? '#ff9900' : 'none'} 
                    color="#ff9900" 
                  />
                ))}
              </div>
              <span className="rating-score">{product.rating}</span>
              <span className="rating-count">({product.reviewsCount} {lang === 'km' ? 'មតិវាយតម្លៃ' : 'reviews'})</span>
            </div>

            <div className="quickview-pricing">
              <span className="current-price">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="old-price">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <p className="quickview-desc">{product.description}</p>

            {/* Racket Custom Restringing Options */}
            {product.category === 'rackets' && (
              <div className="stringing-customizer-box modern-customizer">
                <div className="customizer-title">
                  <Wrench size={15} className="text-orange" />
                  <span>{lang === 'km' ? 'ជ្រើសរើសខ្សែ & កម្លាំងទាញ' : 'String & Tension Setup'}</span>
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
                    <span>22 lbs ({lang === 'km' ? 'ទន់' : 'Control'})</span>
                    <span>26 lbs ({lang === 'km' ? 'ស្តង់ដារ' : 'Club'})</span>
                    <span>30 lbs ({lang === 'km' ? 'ប្រកួត' : 'Pro'})</span>
                  </div>
                </div>
              </div>
            )}

            {/* Add to cart action */}
            <div className="quickview-cta-box">
              <button 
                className={`btn btn-primary btn-lg btn-full-width ${isOutOfStock ? 'btn-disabled' : ''}`}
                onClick={handleAddWithSpecs}
                disabled={isOutOfStock}
              >
                <ShoppingCart size={18} />
                <span>
                  {isOutOfStock 
                    ? (lang === 'km' ? 'ដាច់ស្តុកបណ្តោះអាសន្ន' : 'Temporarily Out of Stock') 
                    : `${t('product.addToCart')} - $${product.price.toFixed(2)}`}
                </span>
              </button>
            </div>

            <div className="quickview-trust-row">
              <ShieldCheck size={14} className="text-green" />
              <span>{lang === 'km' ? 'ទំនិញសុទ្ធ ១០០% • ដោតខ្សែដោយម៉ាស៊ីនអេឡិចត្រូនិចត្រឹមត្រូវ' : '100% Authentic • Precision Electronic Restringing'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
