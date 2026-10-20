import React from 'react';
import { Star, Heart, Eye, ShoppingCart, Scale } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onQuickView, 
  onToggleWishlist, 
  isWishlisted,
  isCompared,
  onToggleCompare 
}) {
  const { t, lang } = useLanguage();
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const isOutOfStock = (product.stockCount !== undefined && product.stockCount <= 0) || product.inStock === false;
  const isLowStock = !isOutOfStock && product.stockCount !== undefined && product.stockCount <= 5;

  return (
    <div className={`product-card ${isOutOfStock ? 'card-out-of-stock' : ''}`}>
      {/* Top Badges & Wishlist */}
      <div className="product-card-badges">
        {isOutOfStock ? (
          <span className="product-badge badge-out-of-stock">
            {lang === 'km' ? 'ដាច់ស្តុក' : 'OUT OF STOCK'}
          </span>
        ) : product.badge ? (
          <span className={`product-badge ${product.badge.toLowerCase().includes('deal') || product.badge.includes('OFF') ? 'badge-deal' : 'badge-regular'}`}>
            {lang === 'km' && product.badge.includes('OFF') 
              ? `បញ្ចុះ ${discountPercent}%` 
              : lang === 'km' && product.badge.includes('Bestseller') 
                ? 'លក់ដាច់បំផុត' 
                : product.badge}
          </span>
        ) : null}
        <button 
          className={`btn-wishlist-toggle ${isWishlisted ? 'active' : ''}`}
          onClick={() => onToggleWishlist(product.id)}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} fill={isWishlisted ? '#ef4444' : 'none'} color={isWishlisted ? '#ef4444' : '#64748b'} />
        </button>
      </div>

      {/* Product Image */}
      <div className="product-card-image-wrap" onClick={() => onQuickView(product.id)}>
        <img src={product.image} alt={product.name} className="product-card-image" />
        <div className="image-overlay-actions">
          <button 
            className="btn-overlay-quick"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product.id);
            }}
          >
            <Eye size={15} />
            <span>{t('product.quickView')}</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="product-card-info">
        <span className="product-card-brand">{product.brand}</span>
        <h4 className="product-card-title" onClick={() => onQuickView(product.id)}>
          {product.name}
        </h4>

        {/* Rating */}
        <div className="product-card-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={13} 
                fill={i < Math.floor(product.rating) ? '#ff9900' : 'none'} 
                color="#ff9900" 
              />
            ))}
          </div>
          <span className="rating-num">{product.rating.toFixed(1)}</span>
          <span className="review-num">({product.reviewsCount})</span>
        </div>

        {/* Specs tag preview if available */}
        {product.specs && product.category === 'rackets' && (
          <div className="product-specs-chip">
            <span>{product.specs.balance}</span>
            <span className="dot">•</span>
            <span>{product.specs.weightClass}</span>
            <span className="dot">•</span>
            <span>{product.specs.flex}</span>
          </div>
        )}
        {product.category === 'shoes' && product.specs && (
          <div className="product-specs-chip">
            <span>{product.specs.weight}</span>
            <span className="dot">•</span>
            <span>{product.specs.type}</span>
          </div>
        )}
        {product.category === 'shuttles' && product.specs && (
          <div className="product-specs-chip">
            <span>{product.specs.feather}</span>
            <span className="dot">•</span>
            <span>{product.specs.speed}</span>
          </div>
        )}

        {/* Price Row & Low Stock Urgency */}
        <div className="product-card-pricing">
          <div className="price-container">
            <span className="current-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="list-price">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          {discountPercent > 0 && !isOutOfStock && (
            <span className="save-tag">
              {lang === 'km' ? `ចំណេញ ${discountPercent}%` : `Save ${discountPercent}%`}
            </span>
          )}
        </div>

        {/* Live Stock Urgency Indicator */}
        {isLowStock && (
          <div className="card-stock-warning">
            <span className="low-stock-pulse"></span>
            <span>{lang === 'km' ? `នៅសល់តែ ${product.stockCount} គ្រឿងទៀតប៉ុណ្ណោះ!` : `Only ${product.stockCount} left in stock!`}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="product-card-actions">
          {product.category === 'rackets' && onToggleCompare && (
            <button 
              className={`btn-card-compare ${isCompared ? 'active' : ''}`}
              onClick={() => onToggleCompare(product)}
              title={isCompared ? 'Remove from compare' : 'Add to compare'}
            >
              <Scale size={14} />
              <span>{isCompared ? (lang === 'km' ? 'បានជ្រើស' : 'Compared') : (lang === 'km' ? '+ ប្រៀបធៀប' : '+ Compare')}</span>
            </button>
          )}

          <button 
            className={`btn-card-add-cart ${isOutOfStock ? 'btn-out-stock' : ''}`}
            onClick={() => !isOutOfStock && onAddToCart(product.id)}
            disabled={isOutOfStock}
          >
            <ShoppingCart size={15} />
            <span>
              {isOutOfStock 
                ? (lang === 'km' ? 'ដាច់ស្តុក' : 'Out of Stock') 
                : t('product.addToCart')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
