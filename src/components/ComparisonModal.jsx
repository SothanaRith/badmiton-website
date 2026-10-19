import React from 'react';
import { X, Scale, ShoppingCart, Trash2, CheckCircle2 } from 'lucide-react';
import { BadmintonIcon } from './BadmintonIcon';
import { useLanguage } from '../context/LanguageContext';

export default function ComparisonModal({ isOpen, onClose, compareItems, onRemoveFromCompare, onAddToCart }) {
  const { t, lang } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container compare-modal-box animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="modal-icon-badge">
              <Scale size={20} />
            </div>
            <div>
              <h2 className="modal-title">{t('compareModal.title')}</h2>
              <p className="modal-sub">
                {lang === 'km' 
                  ? `កំពុងវិភាគរ៉ាកែតកម្រិតប្រកួតចំនួន ${compareItems.length}` 
                  : `Analyzing ${compareItems.length} professional badminton rackets`}
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close comparison">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        {compareItems.length === 0 ? (
          <div className="compare-empty-state">
            <div className="empty-icon">
              <BadmintonIcon size={56} color="#0284c7" />
            </div>
            <h3>{t('compareModal.empty')}</h3>
            <p>{lang === 'km' ? 'ជ្រើសរើសរ៉ាកែតរហូតដល់ ៣ គ្រឿងដើម្បីប្រៀបធៀបលក្ខណៈបច្ចេកទេសទន្ទឹមគ្នា។' : 'Select up to 3 rackets from the catalog using the "+ Compare" button to analyze their specs side-by-side.'}</p>
            <button className="btn btn-primary" onClick={onClose}>{t('cart.startShopping')}</button>
          </div>
        ) : (
          <div className="compare-table-wrapper">
            <table className="compare-table">
              <thead>
                <tr>
                  <th className="spec-label-col">{t('compareModal.metric')}</th>
                  {compareItems.map(item => (
                    <th key={item.id} className="spec-product-col">
                      <div className="compare-product-header">
                        <button 
                          className="btn-remove-compare"
                          onClick={() => onRemoveFromCompare(item.id)}
                          title={t('compareModal.remove')}
                        >
                          <Trash2 size={14} />
                          <span>{t('compareModal.remove')}</span>
                        </button>
                        <div className="compare-thumb-box">
                          <img src={item.image} alt={item.name} className="compare-thumb" />
                        </div>
                        <span className="compare-item-brand">{item.brand}</span>
                        <h4 className="compare-item-name">{item.name}</h4>
                        <div className="compare-item-price">${item.price.toFixed(2)}</div>
                        <button 
                          className="btn btn-primary btn-sm btn-compare-cart"
                          onClick={() => onAddToCart(item.id)}
                        >
                          <ShoppingCart size={14} />
                          <span>{t('product.addToCart')}</span>
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="spec-row-name">{t('compareModal.balance')}</td>
                  {compareItems.map(item => (
                    <td key={item.id} className="spec-val-cell">
                      <span className={`pill-spec-balance ${item.specs.balance.toLowerCase().replace('-', '')}`}>
                        {item.specs.balance}
                      </span>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="spec-row-name">{t('compareModal.flex')}</td>
                  {compareItems.map(item => (
                    <td key={item.id} className="spec-val-cell">
                      <strong>{item.specs.flex}</strong>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="spec-row-name">{lang === 'km' ? 'ទម្ងន់ & ទំហំដៃកាន់' : 'Weight & Grip'}</td>
                  {compareItems.map(item => (
                    <td key={item.id} className="spec-val-cell">
                      {item.specs.weightGrip}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="spec-row-name">{t('compareModal.maxTension')}</td>
                  {compareItems.map(item => (
                    <td key={item.id} className="spec-val-cell">
                      <span className="tension-badge">{item.specs.tensionMax}</span>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="spec-row-name">{lang === 'km' ? 'ស្ទីលលេងដែលស័ក្តិសម' : 'Best Suited Playstyle'}</td>
                  {compareItems.map(item => (
                    <td key={item.id} className="spec-val-cell">
                      {item.specs.playStyle}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="spec-row-name">{lang === 'km' ? 'កម្លាំងវាយ Smash' : 'Smash Power Index'}</td>
                  {compareItems.map(item => (
                    <td key={item.id} className="spec-val-cell">
                      <div className="compare-meter-cell">
                        <div className="meter-val-row">
                          <span>{item.specs.smashPower} / 100</span>
                        </div>
                        <div className="meter-track">
                          <div 
                            className="meter-fill meter-power" 
                            style={{ width: `${item.specs.smashPower}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="spec-row-name">{lang === 'km' ? 'ការគ្រប់គ្រង & ល្បឿនការពារ' : 'Handling & Defense Speed'}</td>
                  {compareItems.map(item => (
                    <td key={item.id} className="spec-val-cell">
                      <div className="compare-meter-cell">
                        <div className="meter-val-row">
                          <span>{item.specs.controlSpeed} / 100</span>
                        </div>
                        <div className="meter-track">
                          <div 
                            className="meter-fill meter-control" 
                            style={{ width: `${item.specs.controlSpeed}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="spec-row-name">{lang === 'km' ? 'បច្ចេកវិទ្យាកាបូនតួរ៉ាកែត' : 'Frame Carbon Tech'}</td>
                  {compareItems.map(item => (
                    <td key={item.id} className="spec-val-cell small-text">
                      {item.specs.frameMaterial}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="modal-footer">
          <div className="modal-footer-note">
            <CheckCircle2 size={16} className="text-accent" />
            <span>{lang === 'km' ? 'រ៉ាកែតទាំងអស់មានតែម Hologram បញ្ជាក់ផលិតផលសុទ្ធ និងការធានាផ្លូវការ។' : 'All racquets come with certified authentic hologram sticker and electronic warranty.'}</span>
          </div>
          <button className="btn btn-outline" onClick={onClose}>{lang === 'km' ? 'បិទការប្រៀបធៀប' : 'Close Comparison'}</button>
        </div>
      </div>
    </div>
  );
}
