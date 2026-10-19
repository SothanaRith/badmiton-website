import React from 'react';
import { Truck, ShieldCheck, Wrench, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function MiddlePromoBanner({ onScrollToDeals }) {
  const { lang } = useLanguage();

  return (
    <section className="middle-promo-section" id="delivery-promo">
      <div className="container">
        <div className="middle-promo-card">
          <div className="middle-promo-content">
            <span className="promo-eyebrow">
              <Truck size={14} />
              <span>{lang === 'km' ? 'សេវាដឹកជញ្ជូនផ្ទាល់ដល់តារាងសី' : 'DIRECT-TO-COURT LOGISTICS'}</span>
            </span>

            <h2 className="promo-headline">
              {lang === 'km' ? (
                <>
                  SMASHZONE ដឹកជញ្ជូនរហ័ស <br />
                  <span className="text-accent-blue">ដល់ផ្ទះ &amp; តារាងវាយសីរបស់អ្នក</span>
                </>
              ) : (
                <>
                  SMASHZONE DELIVERS <br />
                  <span className="text-accent-blue">TO YOUR DOORSTEP &amp; CLUB</span>
                </>
              )}
            </h2>

            <p className="promo-description">
              {lang === 'km'
                ? 'ដឹកជញ្ជូនរហ័សដល់តារាងកីឡា សេវាដាក់ខ្សែអេឡិចត្រូនិចដោយជាងជំនាញកម្រិត BWF និងការធានារ៉ាកែតសុទ្ធ 100% ពី Yonex, Victor និង Li-Ning។'
                : 'Next-day tournament delivery, professional electronic restringing by certified BWF technicians, and tamper-proof serial verification on every Yonex, Victor, and Li-Ning racket.'}
            </p>

            <div className="promo-features-list">
              <div className="feature-pill">
                <ShieldCheck size={16} className="feature-icon" />
                <span>{lang === 'km' ? 'ធានាទំនិញសុទ្ធ 100%' : '100% Verified Authentic'}</span>
              </div>
              <div className="feature-pill">
                <Wrench size={16} className="feature-icon" />
                <span>{lang === 'km' ? 'សេវាដាក់ខ្សែអេឡិចត្រូនិច' : 'Custom Electronic Stringing'}</span>
              </div>
              <div className="feature-pill">
                <Truck size={16} className="feature-icon" />
                <span>{lang === 'km' ? 'ដឹកជញ្ជូនរហ័សដល់តារាង' : 'Express Court Dispatch'}</span>
              </div>
            </div>

            <div className="promo-cta-row">
              <button className="btn btn-dark" onClick={onScrollToDeals}>
                <span>{lang === 'km' ? 'ទិញសម្ភារៈប្រូម៉ូសិនថ្ងៃនេះ' : "Shop Today's Gear Deals"}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="middle-promo-image-box">
            <img 
              src="/images/delivery-promo.jpg" 
              alt="SmashZone Badminton Gear Delivery Box" 
              className="middle-promo-img" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
