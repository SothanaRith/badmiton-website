import React from 'react';
import { X, Heart, Trash2, ShoppingCart } from 'lucide-react';
import { PRODUCTS } from '../data/badmintonData';
import { useLanguage } from '../context/LanguageContext';

export default function WishlistDrawer({ isOpen, onClose, wishlist, onRemoveFromWishlist, onAddToCart }) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const wishlistedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-content animate-slide-in" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-header-title">
            <Heart size={20} className="text-red" fill="#ef4444" color="#ef4444" />
            <h3>{t('wishlist.title')} ({wishlistedProducts.length})</h3>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close wishlist">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body">
          {wishlistedProducts.length === 0 ? (
            <div className="drawer-empty-state">
              <div className="empty-shuttle-icon">
                <Heart size={48} fill="#ef4444" color="#ef4444" />
              </div>
              <h4>{t('wishlist.empty')}</h4>
              <p>{t('wishlist.emptySub')}</p>
              <button className="btn btn-primary" onClick={onClose}>{t('cart.startShopping')}</button>
            </div>
          ) : (
            <div className="cart-items-list">
              {wishlistedProducts.map(product => (
                <div key={product.id} className="cart-item-row">
                  <div className="cart-item-img-box">
                    <img src={product.image} alt={product.name} className="cart-item-img" />
                  </div>

                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <span className="cart-item-brand">{product.brand}</span>
                      <button 
                        className="btn-item-delete"
                        onClick={() => onRemoveFromWishlist(product.id)}
                        title="Remove from favorites"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <h4 className="cart-item-name">{product.name}</h4>
                    <div className="cart-item-price">${product.price.toFixed(2)}</div>

                    <div className="wishlist-action-row">
                      <button 
                        className="btn btn-primary btn-sm btn-wishlist-cart"
                        onClick={() => {
                          onAddToCart(product.id);
                          onRemoveFromWishlist(product.id);
                        }}
                      >
                        <ShoppingCart size={14} />
                        <span>{t('wishlist.moveToCart')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
