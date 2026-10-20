import React from 'react';
import { ShieldCheck, Award, Wrench, Globe, Truck, RotateCcw } from 'lucide-react';
import { BadmintonIcon } from './BadmintonIcon';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function Footer({ onScrollToTop, onOpenTrackOrder, onOpenAdmin, onOpenLegal }) {
  const { t, lang } = useLanguage();
  const { isAdmin } = useAuth();

  return (
    <footer className="site-footer">
      {/* Back to top button */}
      <button className="footer-back-to-top" onClick={onScrollToTop}>
        {lang === 'km' ? 'ត្រឡប់ទៅខាងលើបង្អស់' : 'Back to top'}
      </button>

      {/* Trust bar */}
      <div className="footer-trust-strip">
        <div className="container footer-trust-content">
          <div className="trust-col">
            <ShieldCheck size={24} className="trust-icon" />
            <div>
              <strong>{lang === 'km' ? 'ធានាទំនិញសុទ្ធ ១០០%' : '100% Authentic Gear'}</strong>
              <p>{lang === 'km' ? 'នាំចូលផ្ទាល់ពី Yonex, Victor & Li-Ning' : 'Direct from Yonex, Victor & Li-Ning'}</p>
            </div>
          </div>
          <div className="trust-col">
            <Wrench size={24} className="trust-icon" />
            <div>
              <strong>{lang === 'km' ? 'សេវាដាក់ខ្សែអេឡិចត្រូនិច' : 'Pro Electronic Restringing'}</strong>
              <p>{lang === 'km' ? 'ម៉ាស៊ីនអេឡិចត្រូនិច Yonex Protech 8' : 'Calibrated electronic Yonex machines'}</p>
            </div>
          </div>
          <div className="trust-col">
            <Award size={24} className="trust-icon" />
            <div>
              <strong>{lang === 'km' ? 'ស្តង់ដារ BWF អន្តរជាតិ' : 'BWF Certified Standards'}</strong>
              <p>{lang === 'km' ? 'សម្ភារៈស្តង់ដារប្រកួតផ្លូវការ' : 'Official tournament grade equipment'}</p>
            </div>
          </div>
          <div className="trust-col">
            <Globe size={24} className="trust-icon" />
            <div>
              <strong>{lang === 'km' ? 'ដឹកជញ្ជូនរហ័សទូទាំង ២៥ ខេត្តក្រុង' : 'Cambodia & Global Express'}</strong>
              <p>{lang === 'km' ? 'ដឹកជញ្ជូនដល់តារាងសី និងផ្ទះ' : 'Direct to court across 25 provinces'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-column link directory */}
      <div className="footer-links-area">
        <div className="container footer-links-grid">
          <div className="footer-column">
            <h4 className="footer-col-title">{lang === 'km' ? 'អំពី SmashZone' : 'Get to Know Us'}</h4>
            <ul className="footer-link-list">
              <li><a href="#about">{lang === 'km' ? 'អំពីហាង SmashZone Pro' : 'About SmashZone Pro'}</a></li>
              <li><a href="#careers">{lang === 'km' ? 'ឱកាសការងារជាងដាក់ខ្សែ' : 'Stringing Careers'}</a></li>
              <li><a href="#bwf">{lang === 'km' ? 'ដៃគូការប្រកួត BWF' : 'BWF Tournament Partnerships'}</a></li>
              <li><a href="#sponsorship">{lang === 'km' ? 'កម្មវិធីឧបត្ថម្ភកីឡាករ' : 'Player Sponsorship Program'}</a></li>
              <li><a href="#stores">{lang === 'km' ? 'ទីតាំងសាខាហាង' : 'Court Pro Shops'}</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-col-title">{lang === 'km' ? 'សហការជាមួយយើង' : 'Make Money with Us'}</h4>
            <ul className="footer-link-list">
              <li><a href="#club">{lang === 'km' ? 'តម្លៃលក់ដុំសម្រាប់ក្លឹបវាយសី' : 'Badminton Club Wholesale'}</a></li>
              <li><a href="#affiliate">{lang === 'km' ? 'កម្មវិធីដៃគូផ្សព្វផ្សាយ (Affiliate)' : 'Affiliate Partner Program'}</a></li>
              <li><a href="#stringers">{lang === 'km' ? 'ចូលរួមបណ្តាញជាងដាក់ខ្សែ' : 'Join Certified Stringers Network'}</a></li>
              <li><a href="#coaches">{lang === 'km' ? 'ការបញ្ចុះតម្លៃសម្រាប់គ្រូបង្វឹក' : 'Coach Equipment Discounts'}</a></li>
              <li><a href="#academy">{lang === 'km' ? 'គណនីសាលារៀន & សាលាបង្វឹក' : 'School & Academy Accounts'}</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-col-title">{lang === 'km' ? 'ការណែនាំសម្ភារៈ' : 'Equipment Guides'}</h4>
            <ul className="footer-link-list">
              <li><a href="#guide-balance">{lang === 'km' ? 'ការណែនាំអំពីចំណុចតុល្យភាពរ៉ាកែត' : 'Racket Balance Point Guide'}</a></li>
              <li><a href="#guide-tension">{lang === 'km' ? 'តារាងកម្លាំងទាញខ្សែ & ទំហំខ្សែ' : 'String Tension & Gauge Chart'}</a></li>
              <li><a href="#guide-shuttle">{lang === 'km' ? 'របៀបជ្រើសរើសល្បឿនកូនសី (77 vs 78)' : 'Shuttlecock Speed Selector (77 vs 78)'}</a></li>
              <li><a href="#guide-shoes">{lang === 'km' ? 'ការជ្រើសរើសទំហំស្បែកជើង' : 'Badminton Shoe Sizing & Grip'}</a></li>
              <li><a href="#guide-grip">{lang === 'km' ? 'ការប្រៀបធៀបក្រវាត់ដៃកៅស៊ូ & កន្សែង' : 'Tacky vs Towel Grip Comparison'}</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-col-title">{lang === 'km' ? 'សេវាបម្រើអតិថិជន' : 'Customer Care'}</h4>
            <ul className="footer-link-list">
              <li>
                <button 
                  className="footer-text-btn"
                  onClick={onOpenTrackOrder}
                >
                  <Truck size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                  <span>{t('nav.trackOrder')}</span>
                </button>
              </li>
              <li>
                <button 
                  className="footer-text-btn"
                  onClick={() => onOpenLegal && onOpenLegal('refunds')}
                >
                  <RotateCcw size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                  <span>{lang === 'km' ? 'គោលការណ៍ប្តូរទំនិញ & សងប្រាក់វិញ' : '30-Day Returns & Refunds'}</span>
                </button>
              </li>
              <li><a href="#shipping">{lang === 'km' ? 'តម្លៃដឹកជញ្ជូន (VET, J&T, Jalat)' : 'Cambodia Courier Rates (VET, J&T, Jalat)'}</a></li>
              <li><a href="#warranty">{lang === 'km' ? 'ការធានាតួរ៉ាកែត' : 'Racket Frame Warranty'}</a></li>
              {/* Only show Admin portal if logged in as Admin or SuperAdmin */}
              {isAdmin && (
                <li>
                  <button 
                    className="footer-text-btn footer-admin-access-btn"
                    onClick={onOpenAdmin}
                  >
                    <Wrench size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                    <span>{t('nav.adminPortal')}</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="footer-bottom-bar">
        <div className="container footer-bottom-content">
          <div className="footer-brand-summary">
            <span className="footer-logo">
              <BadmintonIcon size={20} color="#ff9900" />
              <span> SMASH<span className="accent-orange">ZONE</span></span>
            </span>
            <span className="footer-copy">{t('footer.copyright')}</span>
          </div>

          <div className="footer-legal-links">
            <button 
              className="footer-legal-btn" 
              onClick={() => onOpenLegal && onOpenLegal('conditions')}
            >
              {lang === 'km' ? 'លក្ខខណ្ឌប្រើប្រាស់' : 'Conditions of Use'}
            </button>
            <span className="dot">•</span>
            <button 
              className="footer-legal-btn" 
              onClick={() => onOpenLegal && onOpenLegal('privacy')}
            >
              {lang === 'km' ? 'គោលការណ៍ភាពឯកជន' : 'Privacy Notice'}
            </button>
            <span className="dot">•</span>
            <button 
              className="footer-legal-btn" 
              onClick={() => onOpenLegal && onOpenLegal('refunds')}
            >
              {lang === 'km' ? 'ការសងប្រាក់' : 'Refunds'}
            </button>
            {isAdmin && (
              <>
                <span className="dot">•</span>
                <button className="footer-legal-admin-btn" onClick={onOpenAdmin}>
                  {lang === 'km' ? 'គ្រប់គ្រងហាង Admin' : 'Admin Portal'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
