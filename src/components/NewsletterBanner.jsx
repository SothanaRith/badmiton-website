import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { BadmintonIcon } from './BadmintonIcon';
import { useLanguage } from '../context/LanguageContext';

export default function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { lang } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-card">
          <div className="newsletter-content">
            <span className="newsletter-eyebrow">
              {lang === 'km' ? 'សហគមន៍អ្នកវាយសី SMASHZONE' : 'EXCLUSIVE SMASH COMMUNITY'}
            </span>
            <h2 className="newsletter-title">
              {lang === 'km' ? (
                <>
                  ចុះឈ្មោះចូលរួម <br />
                  <span className="text-orange">SMASHZONE VIP CLUB</span>
                </>
              ) : (
                <>
                  SUBSCRIBE TO THE <br />
                  <span className="text-orange">SMASHZONE VIP CLUB</span>
                </>
              )}
            </h2>
            <p className="newsletter-sub">
              {lang === 'km' ? (
                <>
                  ទទួលបានប័ណ្ណបញ្ចុះតម្លៃ <strong>$15</strong> សម្រាប់ការទិញរ៉ាកែតដំបូង និងការជូនដំណឹងពីទំនិញថ្មីៗមុនគេ។
                </>
              ) : (
                <>
                  Receive a <strong>$15 coupon</strong> on your first pro racket, tournament drop notifications, 
                  and VIP restringing priority. No spam, only pure badminton mastery.
                </>
              )}
            </p>

            {subscribed ? (
              <div className="newsletter-success">
                <CheckCircle size={22} className="text-green" />
                <span>
                  {lang === 'km' 
                    ? 'សូមអបអរសាទរ! អ្នកបានក្លាយជាសមាជិក VIP ហើយ។ សូមពិនិត្យប្រអប់សំបុត្រ Email របស់អ្នក។' 
                    : "You're in! Welcome to the SmashZone VIP Club. Check your inbox for your $15 voucher."}
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="newsletter-form">
                <div className="newsletter-input-group">
                  <Mail size={18} className="mail-icon" />
                  <input 
                    type="email" 
                    placeholder={lang === 'km' ? 'បញ្ចូលអ៊ីមែលរបស់អ្នក (ឧ. name@example.com)' : 'Enter your email (e.g. lee.chong@smashzone.com)'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="newsletter-input"
                  />
                </div>
                <button type="submit" className="newsletter-btn">
                  <span>{lang === 'km' ? 'ចុះឈ្មោះ & ទទួល $15' : 'Join & Claim $15'}</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>

          <div className="newsletter-art-box">
            <div className="newsletter-circle-bg">
              <span className="badge-shuttle-float">
                <BadmintonIcon size={64} color="#ff9900" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
