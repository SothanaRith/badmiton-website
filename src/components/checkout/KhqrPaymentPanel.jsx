import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { QrCode, CheckCircle2, Clock, RefreshCw, Smartphone } from 'lucide-react';
import { KHR_EXCHANGE_RATE } from '../../data/deliveryData';
import { useLanguage } from '../../context/LanguageContext';

export default function KhqrPaymentPanel({ 
  orderNumber, 
  amountUsd, 
  merchantName = 'SMASHZONE BADMINTON STORE',
  onSuccess 
}) {
  const { t, lang } = useLanguage();
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown
  const [isVerifying, setIsVerifying] = useState(false);

  const amountKhr = Math.round(amountUsd * KHR_EXCHANGE_RATE);

  useEffect(() => {
    // Generate valid mock Bakong KHQR payload
    const khqrPayload = `00020101021230620016bakong@smashzone0108BAKONGKH5204599953038405407${amountUsd.toFixed(2)}5802KH5924${merchantName}6010Phnom Penh62200716${orderNumber}6304`;
    
    QRCode.toDataURL(khqrPayload, {
      width: 220,
      margin: 1,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    }).then(url => {
      setQrDataUrl(url);
    }).catch(err => {
      console.error('Failed to generate QR code:', err);
    });
  }, [orderNumber, amountUsd, merchantName]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSimulatePayment = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onSuccess();
    }, 1200);
  };

  return (
    <div className="khqr-payment-panel">
      {/* Header */}
      <div className="khqr-header">
        <div className="khqr-title-box">
          <div className="khqr-logo-badge">
            <span className="khqr-red-text">KHQR</span>
          </div>
          <div>
            <h4 className="khqr-merchant-name">{merchantName}</h4>
            <p className="khqr-sub-text">{lang === 'km' ? 'ធនាគារជាតិនៃកម្ពុជា • គាំទ្រដោយប្រព័ន្ធបាគង' : 'National Bank of Cambodia • Bakong Supported'}</p>
          </div>
        </div>

        <div className="khqr-timer-pill">
          <Clock size={13} />
          <span>{lang === 'km' ? `ផុតកំណត់ក្នុង ${formatTime(timeLeft)}` : `Expires in ${formatTime(timeLeft)}`}</span>
        </div>
      </div>

      {/* QR Code Container */}
      <div className="khqr-qr-container">
        <div className="khqr-qr-frame">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="Bakong KHQR Payment Code" className="khqr-qr-image" />
          ) : (
            <div className="khqr-loading-placeholder">
              <QrCode size={48} className="animate-pulse" />
              <span>{lang === 'km' ? 'កំពុងបង្កើត KHQR...' : 'Generating KHQR...'}</span>
            </div>
          )}

          <div className="khqr-bakong-center-badge">
            <span>BAKONG</span>
          </div>
        </div>

        {/* Currency Dual Price */}
        <div className="khqr-amount-display">
          <div className="usd-amount">${amountUsd.toFixed(2)} USD</div>
          <div className="khr-amount">&asymp; {amountKhr.toLocaleString()} KHR</div>
        </div>
      </div>

      {/* Bank logos / supported apps info */}
      <div className="khqr-supported-banks">
        <div className="banks-label">
          <Smartphone size={13} />
          <span>{lang === 'km' ? 'ស្កេនទូទាត់ជាមួយគ្រប់ App ធនាគារ៖' : 'Scan with any mobile banking app:'}</span>
        </div>
        <div className="bank-tags-row">
          <span className="bank-tag aba">ABA Mobile</span>
          <span className="bank-tag acleda">ACLEDA</span>
          <span className="bank-tag wing">Wing Bank</span>
          <span className="bank-tag bakong">Bakong</span>
          <span className="bank-tag canadia">Canadia</span>
          <span className="bank-tag sathapana">Sathapana</span>
        </div>
      </div>

      {/* Action / Test simulator button */}
      <div className="khqr-action-box">
        <button 
          className="btn btn-primary btn-full btn-simulate-pay"
          onClick={handleSimulatePayment}
          disabled={isVerifying}
        >
          {isVerifying ? (
            <>
              <RefreshCw size={16} className="animate-spin" />
              <span>{t('khqr.verifying')}</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={16} />
              <span>{t('khqr.payNowSimulate')}</span>
            </>
          )}
        </button>

        <p className="khqr-demo-hint">
          {lang === 'km' 
            ? 'ទូទាត់ប្រាក់ភ្លាមៗតាមប្រព័ន្ធ Bakong Open API Gateway របស់ធនាគារជាតិ។' 
            : 'Instant automatic settlement via Bakong open API gateway.'}
        </p>
      </div>
    </div>
  );
}
