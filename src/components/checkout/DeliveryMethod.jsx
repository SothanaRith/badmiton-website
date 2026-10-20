import React from 'react';
import { Store } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function DeliveryMethod({ 
  value, 
  onChange, 
  providers, 
  isFreeDelivery 
}) {
  const { t, lang } = useLanguage();

  return (
    <div className="delivery-method-step">
      <div className="step-header">
        <h3 className="step-title">{t('checkout.selectCourier')}</h3>
        <p className="step-sub">
          {lang === 'km' 
            ? 'ជ្រើសរើសសេវាដឹកជញ្ជូនរថយន្តក្រុងទូទាំងប្រទេស ដឹកដល់មាត់ទ្វារ ឬមកយកផ្ទាល់' 
            : 'Choose nationwide express bus courier, doorstep dispatch, or court pickup'}
        </p>
      </div>

      <div className="delivery-providers-list">
        {providers.filter(p => p.active).map(provider => {
          const isSelected = value === provider.id;
          const fee = (isFreeDelivery || provider.feeUSD === 0) ? 0 : provider.feeUSD;

          return (
            <label 
              key={provider.id} 
              className={`delivery-provider-card ${isSelected ? 'selected' : ''}`}
            >
              <input 
                type="radio" 
                name="deliveryProvider" 
                checked={isSelected}
                onChange={() => onChange(provider.id)}
                className="provider-radio"
              />

              <div className="provider-logo-box">
                {provider.logo ? (
                  <img src={provider.logo} alt={provider.name} className="provider-logo-img" />
                ) : (
                  <div className="provider-logo-fallback">
                    <Store size={22} className="text-orange" />
                  </div>
                )}
              </div>

              <div className="provider-info">
                <div className="provider-name-row">
                  <h4 className="provider-name">
                    {lang === 'km' && provider.nameKm ? provider.nameKm : provider.name}
                  </h4>
                  {provider.id === 'virak-buntham' && (
                    <span className="courier-badge">{lang === 'km' ? 'គ្រប់ ២៥ ខេត្តក្រុង' : 'All 25 Provinces'}</span>
                  )}
                  {provider.id === 'jalat-delivery' && (
                    <span className="courier-badge fast">{lang === 'km' ? 'រហ័សក្នុងភ្នំពេញ' : 'Phnom Penh Express'}</span>
                  )}
                </div>
                <p className="provider-desc">
                  {lang === 'km' && provider.descKm ? provider.descKm : provider.desc}
                </p>
              </div>

              <div className="provider-fee-box">
                {fee === 0 ? (
                  <span className="fee-free">{lang === 'km' ? 'ឥតគិតថ្លៃ' : 'FREE'}</span>
                ) : (
                  <span className="fee-amount">${fee.toFixed(2)}</span>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
