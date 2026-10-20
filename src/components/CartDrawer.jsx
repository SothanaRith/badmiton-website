import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { BadmintonIcon } from './BadmintonIcon';
import { useLanguage } from '../context/LanguageContext';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  onRemoveItem, 
  _onClearCart,
  onProceedCheckout,
  products = []
}) {
  const { t, lang } = useLanguage();

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const freeShippingThreshold = 199;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-content animate-slide-in" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-header-title">
            <ShoppingBag size={20} className="text-orange" />
            <h3>{t('cart.title')} ({cart.reduce((s, i) => s + i.quantity, 0)})</h3>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="cart-shipping-meter">
          <div className="shipping-meter-text">
            {remainingForFree === 0 ? (
              <span className="unlocked-text">
                <Sparkles size={14} /> {lang === 'km' ? 'ទទួលបានការដឹកជញ្ជូន & ដាក់ខ្សែឥតគិតថ្លៃ!' : 'Free Express Delivery & Restringing Unlocked!'}
              </span>
            ) : (
              <span>
                {lang === 'km' 
                  ? <>ទិញបន្ថែមត្រឹមតែ <strong>${remainingForFree.toFixed(2)}</strong> ដើម្បីទទួលបានការដឹកជញ្ជូនឥតគិតថ្លៃ</>
                  : <>Add <strong>${remainingForFree.toFixed(2)}</strong> more for Free Restringing &amp; Shipping</>}
              </span>
            )}
          </div>
          <div className="shipping-progress-track">
            <div 
              className="shipping-progress-bar" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Cart items list */}
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="drawer-empty-state">
              <div className="empty-shuttle-icon">
                <BadmintonIcon size={48} color="#ff9900" />
              </div>
              <h4>{t('cart.empty')}</h4>
              <p>{t('cart.emptySub')}</p>
              <button className="btn btn-primary" onClick={onClose}>{t('cart.startShopping')}</button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map(item => (
                <div key={item.id} className="cart-item-row">
                  <div className="cart-item-img-box">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                  </div>

                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <span className="cart-item-brand">{item.brand}</span>
                      <button 
                        className="btn-item-delete"
                        onClick={() => onRemoveItem(item.id)}
                        title="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <h4 className="cart-item-name">{item.name}</h4>

                    {item.selectedString && (
                      <div className="cart-item-customization">
                        <span className="customization-tag">String: {item.selectedString}</span>
                        {item.stringTension && (
                          <span className="customization-tag">Tension: {item.stringTension} lbs</span>
                        )}
                      </div>
                    )}

                    <div className="cart-item-bottom">
                      <div className="quantity-stepper">
                        <button 
                          className="stepper-btn"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          title="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="stepper-val">{item.quantity}</span>
                        {(() => {
                          const p = products.find(prod => prod.id === item.id);
                          const maxStock = p ? (p.stockCount ?? 99) : 99;
                          const isMaxReached = item.quantity >= maxStock;

                          return (
                            <button 
                              className={`stepper-btn ${isMaxReached ? 'disabled' : ''}`}
                              onClick={() => !isMaxReached && onUpdateQuantity(item.id, item.quantity + 1)}
                              disabled={isMaxReached}
                              title={isMaxReached ? (lang === 'km' ? `ស្តុកអតិបរមា ${maxStock}` : `Max stock reached (${maxStock})`) : "Increase quantity"}
                            >
                              <Plus size={13} />
                            </button>
                          );
                        })()}
                      </div>

                      <div className="cart-item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="subtotal-row">
              <span className="subtotal-label">{t('cart.subtotal')}</span>
              <span className="subtotal-amount">${subtotal.toFixed(2)}</span>
            </div>

            <p className="shipping-note">
              {t('cart.shippingCalculated')}
            </p>

            <button 
              className="btn btn-checkout"
              onClick={() => {
                onClose();
                onProceedCheckout();
              }}
            >
              <span>{t('cart.checkout')}</span>
              <ArrowRight size={18} />
            </button>

            <div className="checkout-trust-badge">
              <ShieldCheck size={14} className="text-green" />
              <span>{lang === 'km' ? 'ការទូទាត់មានសុវត្ថិភាព SSL • ទំនិញសុទ្ធ 100% ពីក្រុមហ៊ុន' : 'Encrypted 256-Bit SSL Checkout • 100% Genuine Yonex/Victor Gear'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
