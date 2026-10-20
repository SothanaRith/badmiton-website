import React, { useState, useEffect } from 'react';
import { 
  X, 
  FileText, 
  ShieldCheck, 
  RotateCcw, 
  CheckCircle2, 
  Truck, 
  QrCode, 
  AlertCircle, 
  Clock
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export default function LegalModal({ 
  isOpen, 
  onClose, 
  initialTab = 'conditions', 
  onSubmitRefund,
  orders = []
}) {
  const { t, lang } = useLanguage();
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState(initialTab); // 'conditions' | 'privacy' | 'refunds' | 'request'

  // Refund Form State
  const [orderId, setOrderId] = useState(orders.length > 0 ? orders[0].id : 'ORD-9942');
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [reasonCategory, setReasonCategory] = useState('transit_damage');
  const [refundMethod, setRefundMethod] = useState('khqr');
  const [khqrReceiver, setKhqrReceiver] = useState(currentUser?.phone || '');
  const [notes, setNotes] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setSubmittedTicket(null);
      setError('');
      if (currentUser) {
        if (!customerName) setCustomerName(currentUser.name || '');
        if (!phone) setPhone(currentUser.phone || '');
        if (!khqrReceiver) setKhqrReceiver(currentUser.phone || '');
      }
    }
  }, [isOpen, initialTab, currentUser]);

  if (!isOpen) return null;

  const handleRefundSubmit = (e) => {
    e.preventDefault();
    setError('');

    const cleanOrderId = orderId.replace(/[<>]/g, '').trim();
    const cleanCustomerName = customerName.replace(/[<>]/g, '').trim();
    const cleanPhone = phone.replace(/[^0-9+\s-]/g, '').trim();
    const cleanReceiver = khqrReceiver.replace(/[^0-9+\s-@a-zA-Z]/g, '').trim();
    const cleanNotes = notes.replace(/[<>]/g, '').trim();

    if (!cleanOrderId) {
      setError(lang === 'km' ? 'សូមបញ្ចូលលេខកូដបញ្ជាទិញ' : 'Please provide your Order ID');
      return;
    }
    if (!cleanCustomerName || !cleanPhone) {
      setError(lang === 'km' ? 'សូមបញ្ចូលឈ្មោះ និងលេខទូរស័ព្ទ' : 'Please provide your name and phone number');
      return;
    }

    // Dynamic resolution of actual order details if order exists
    const matchedOrder = orders.find(o => o.id.toLowerCase() === cleanOrderId.toLowerCase());
    const resolvedAmount = matchedOrder ? matchedOrder.total : 145.00;
    const resolvedItem = matchedOrder && matchedOrder.items?.length 
      ? matchedOrder.items.map(it => `${it.name} (x${it.qty || 1})`).join(' + ')
      : 'Tournament Equipment Order';

    const newTicket = {
      id: `REF-${Math.floor(1000 + Math.random() * 9000)}`,
      orderId: cleanOrderId,
      customerName: cleanCustomerName,
      phone: cleanPhone,
      item: resolvedItem,
      amount: resolvedAmount,
      reasonCategory,
      reasonText: cleanNotes || 'Customer requested return under 30-day policy',
      method: refundMethod,
      khqrReceiver: cleanReceiver || cleanPhone,
      status: 'pending',
      createdAt: 'Just now',
      notes: cleanNotes || 'Submitted via customer online return portal.'
    };

    if (onSubmitRefund) {
      onSubmitRefund(newTicket);
    }

    setSubmittedTicket(newTicket);
  };

  const handleResetRefund = () => {
    setSubmittedTicket(null);
    setNotes('');
  };

  return (
    <div className="modal-overlay legal-modal-overlay" onClick={onClose}>
      <div className="modal-container legal-modal-card animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="legal-modal-header">
          <div className="legal-tabs-bar">
            <button 
              className={`legal-tab-btn ${activeTab === 'conditions' ? 'active' : ''}`}
              onClick={() => { setActiveTab('conditions'); setSubmittedTicket(null); }}
            >
              <FileText size={16} />
              <span>{t('legal.tabConditions')}</span>
            </button>
            <button 
              className={`legal-tab-btn ${activeTab === 'privacy' ? 'active' : ''}`}
              onClick={() => { setActiveTab('privacy'); setSubmittedTicket(null); }}
            >
              <ShieldCheck size={16} />
              <span>{t('legal.tabPrivacy')}</span>
            </button>
            <button 
              className={`legal-tab-btn ${activeTab === 'refunds' || activeTab === 'request' ? 'active' : ''}`}
              onClick={() => { setActiveTab('refunds'); setSubmittedTicket(null); }}
            >
              <RotateCcw size={16} />
              <span>{t('legal.tabRefunds')}</span>
            </button>
          </div>

          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="legal-modal-body">
          {/* ================================================================= */}
          {/* TAB 1: CONDITIONS OF USE */}
          {/* ================================================================= */}
          {activeTab === 'conditions' && (
            <div className="legal-content-doc animate-fade-in">
              <div className="legal-doc-hero">
                <span className="doc-badge">{lang === 'km' ? 'លក្ខខណ្ឌផ្លូវការ' : 'Official Agreement'}</span>
                <h2>{t('legal.conditionsTitle')}</h2>
                <p className="doc-meta">
                  {lang === 'km' 
                    ? 'ធ្វើបច្ចុប្បន្នភាពចុងក្រោយ: ថ្ងៃទី ២០ ខែតុលា ឆ្នាំ ២០២៦ • ហាងកីឡាវាយសី SmashZone Pro Cambodia' 
                    : 'Last Updated: October 20, 2026 • SmashZone Pro Badminton Cambodia'}
                </p>
              </div>

              <div className="legal-section-block">
                <h3>1. {lang === 'km' ? 'ការធានាទំនិញសុទ្ធ ១០០% & ស្តង់ដារ BWF' : '100% Genuine Gear & BWF Standards'}</h3>
                <p>
                  {lang === 'km'
                    ? 'រាល់ទំនិញទាំងអស់ដែលដាក់លក់នៅលើ SmashZone រួមមានរ៉ាកែត ស្បែកជើង កូនសី និងសរសៃ ត្រូវបាននាំចូលដោយស្របច្បាប់ដោយផ្ទាល់ពីរោងចក្រផ្លូវការ Yonex, Victor និង Li-Ning។ រ៉ាកែតនីមួយៗសុទ្ធតែមានតែម Hologram ផ្លូវការ និងលេខកូដស៊េរីឡាស៊ែរ (Laser Coded Serial) លើ Cone និង Shaft ដែលអាចផ្ទៀងផ្ទាត់បាន។'
                    : 'All equipment sold by SmashZone, including rackets, footwear, shuttles, and strings, is 100% genuine and sourced directly from official Yonex, Victor, and Li-Ning authorized distributors. Every tournament racket features genuine anti-counterfeit hologram stickers and laser-engraved serial codes.'}
                </p>
              </div>

              <div className="legal-section-block">
                <h3>2. {lang === 'km' ? 'គោលការណ៍សេវាដាក់ខ្សែអេឡិចត្រូនិច & កម្លាំងទាញខ្ពស់' : 'Electronic Stringing & High Tension Disclaimer'}</h3>
                <p>
                  {lang === 'km'
                    ? 'សេវាដាក់ខ្សែទាំងអស់ត្រូវបានអនុវត្តដោយជាងជំនាញដែលទទួលបានវិញ្ញាបនបត្រ Yonex Protech តាមក្បាច់ស្តង់ដារ 4-Knot។ សម្រាប់កម្លាំងទាញចាប់ពី 22 ដល់ 28 lbs ស្ថិតក្រោមការធានាការពារតួរ៉ាកែតពេញលេញ។ ចំពោះកីឡាករដែលស្នើសុំកម្លាំងទាញលើសពី 29 lbs ត្រូវយល់ព្រមលើហានិភ័យនៃសំពាធតួរ៉ាកែតខ្ពស់ ដែលអាចប៉ះពាល់ដល់ការធានារបស់រោងចក្រដើម។'
                    : 'All restringing is performed on calibrated electronic tensioning machines using the official 4-knot tournament pattern. Standard string tensions up to 28 lbs are covered by frame safety guidelines. Tensions exceeding 29 lbs are strung upon player request and subject to manufacturer high-tension limits.'}
                </p>
              </div>

              <div className="legal-section-block">
                <h3>3. {lang === 'km' ? 'ការដឹកជញ្ជូនទូទាំង ២៥ ខេត្តក្រុង' : 'Cambodia 25 Provinces Delivery Network'}</h3>
                <p>
                  {lang === 'km'
                    ? 'SmashZone សហការជាមួយក្រុមហ៊ុនដឹកជញ្ជូនឈានមុខគេរួមមាន វីរៈ ប៊ុនថាំ (VET Express), J&T Express និងសេវាដឹកចាលាត់ (Jalat Express) ក្នុងរាជធានីភ្នំពេញ។ រ៉ាកែតទាំងអស់ត្រូវបានវេចខ្ចប់ក្នុងប្រអប់រឹងពិសេសការពារការសង្កត់ ឬបាក់បែក មុនពេលប្រគល់ជូនអ្នកដឹក។'
                    : 'Deliveries across all 25 Cambodian provinces are handled through Virak Buntham (VET Express), J&T Express, and local express couriers (Jalat Express). All rackets are dispatched in reinforced shock-proof triangular packaging to ensure frames remain undamaged during transit.'}
                </p>
              </div>

              <div className="legal-section-block">
                <h3>4. {lang === 'km' ? 'ការទូទាត់ប្រាក់តាម KHQR ជាតិ' : 'National Bakong KHQR Payments'}</h3>
                <p>
                  {lang === 'km'
                    ? 'SmashZone គាំទ្រការទូទាត់ភ្លាមៗតាមរយៈ National Bakong KHQR ទាំងប្រាក់ដុល្លារ (USD) និងប្រាក់រៀល (KHR) ដោយមិនគិតថ្លៃសេវាបន្ថែម។ អត្រាប្តូរប្រាក់ត្រូវបានកំណត់តាមអត្រាស្តង់ដាររបស់ធនាគារជាតិនៃកម្ពុជា (NBC)។'
                    : 'We support instant scan-to-pay via the National Bakong KHQR system in both USD and Khmer Riel (KHR) with zero processing fees, adhering to official National Bank of Cambodia (NBC) foreign exchange benchmarks.'}
                </p>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 2: PRIVACY NOTICE */}
          {/* ================================================================= */}
          {activeTab === 'privacy' && (
            <div className="legal-content-doc animate-fade-in">
              <div className="legal-doc-hero">
                <span className="doc-badge badge-green">{lang === 'km' ? 'សុវត្ថិភាពទិន្នន័យ' : 'Data Protection'}</span>
                <h2>{t('legal.privacyTitle')}</h2>
                <p className="doc-meta">
                  {lang === 'km' 
                    ? 'ការការពារភាពឯកជនរបស់អតិថិជន និងកីឡាករ SmashZone' 
                    : 'SmashZone Player Data Privacy & Security Commitments'}
                </p>
              </div>

              <div className="legal-section-block">
                <h3>1. {lang === 'km' ? 'ទិន្នន័យផ្ទាល់ខ្លួនដែលយើងប្រមូល' : 'Information We Collect'}</h3>
                <p>
                  {lang === 'km'
                    ? 'យើងប្រមូលព័ត៌មានចាំបាច់សម្រាប់ការដឹកជញ្ជូន និងការបញ្ជាទិញ រួមមាន: ឈ្មោះពេញ លេខទូរស័ព្ទសម្រាប់ទាក់ទងពេលដឹកជញ្ជូន អាសយដ្ឋាន ឬទីតាំងតារាងសី និងអាសយដ្ឋានអ៊ីមែលសម្រាប់ការបញ្ជាក់ការទូទាត់ និងវិក្កយបត្រអេឡិចត្រូនិច។'
                    : 'We collect customer information strictly necessary to fulfill e-commerce orders: full name, phone number for courier arrival calls, court or home delivery address across 25 provinces, and email for digital invoices.'}
                </p>
              </div>

              <div className="legal-section-block">
                <h3>2. {lang === 'km' ? 'ការសម្ងាត់ និងការការពារទិន្នន័យ 256-Bit SSL' : '256-Bit SSL Encryption & Security'}</h3>
                <p>
                  {lang === 'km'
                    ? 'រាល់ការតភ្ជាប់ និងទិន្នន័យទាំងអស់ត្រូវបានការពារដោយការអ៊ិនគ្រីបកម្រិតខ្ពស់ 256-Bit SSL។ SmashZone មិនដែលលក់ ឬចែករំលែកទិន្នន័យផ្ទាល់ខ្លួនរបស់អតិថិជនទៅកាន់ភាគីទីបីណាមួយសម្រាប់គោលបំណងពាណិជ្ជកម្មឡើយ។'
                    : 'All communication and transactions are protected under high-grade 256-Bit SSL encryption. SmashZone will never sell, lease, or monetize your personal details with third-party advertising networks.'}
                </p>
              </div>

              <div className="legal-section-block">
                <h3>3. {lang === 'km' ? 'សុវត្ថិភាពការទូទាត់ KHQR & ធនាគារ' : 'Payment Security & Google OAuth'}</h3>
                <p>
                  {lang === 'km'
                    ? 'ព័ត៌មានគណនីធនាគាររបស់អ្នកត្រូវបានការពារដោយសុវត្ថិភាពតាមរយៈប្រព័ន្ធ Bakong ផ្លូវការ។ SmashZone មិនរក្សាទុកលេខកាតឥណទាន ឬលេខកូដសម្ងាត់ធនាគារណាមួយនៅក្នុង Server ឡើយ។ នៅពេលអ្នកប្រើប្រាស់ Google Sign-in យើងទទួលបានត្រឹមតែឈ្មោះ និងអ៊ីមែលដើម្បីផ្ទៀងផ្ទាត់គណនីប៉ុណ្ណោះ។'
                    : 'Bakong KHQR transactions are processed peer-to-peer through the National Bank of Cambodia’s secure settlement rails. SmashZone does not store card numbers or banking PINs. Google OAuth authenticates identity without accessing private Google account data.'}
                </p>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 3: REFUND POLICY & INTERACTIVE REQUEST FORM */}
          {/* ================================================================= */}
          {(activeTab === 'refunds' || activeTab === 'request') && (
            <div className="legal-content-doc animate-fade-in">
              {/* If a ticket was just submitted */}
              {submittedTicket ? (
                <div className="refund-success-card animate-scale-up">
                  <div className="success-icon-wrap">
                    <CheckCircle2 size={44} className="text-green" />
                  </div>
                  <h3>{t('legal.refundSuccessTitle')}</h3>
                  <p className="success-ticket-id">
                    {t('legal.ticketNumber')}: <strong>{submittedTicket.id}</strong>
                  </p>
                  <p className="success-desc">
                    {t('legal.refundSuccessDesc')}
                  </p>
                  <div className="ticket-summary-box">
                    <div className="summary-row">
                      <span>{t('legal.orderId')}:</span>
                      <strong>#{submittedTicket.orderId}</strong>
                    </div>
                    <div className="summary-row">
                      <span>{lang === 'km' ? 'វិធីសាស្ត្រសងប្រាក់' : 'Resolution'}:</span>
                      <strong className="text-orange">Bakong KHQR Instant Refund</strong>
                    </div>
                    <div className="summary-row">
                      <span>{lang === 'km' ? 'គណនីទទួល' : 'Recipient'}:</span>
                      <strong>{submittedTicket.khqrReceiver}</strong>
                    </div>
                  </div>
                  <button className="btn btn-primary" onClick={handleResetRefund}>
                    {lang === 'km' ? 'ដាក់ពាក្យស្នើសុំផ្សេងទៀត' : 'Submit Another Request'}
                  </button>
                </div>
              ) : (
                <>
                  {/* Policy Highlights */}
                  <div className="refund-policy-summary">
                    <div className="policy-badge-row">
                      <div className="policy-pill">
                        <Clock size={15} className="text-orange" />
                        <span>{lang === 'km' ? 'ប្តូរទំនិញក្នុង ៣០ ថ្ងៃ' : '30-Day Hassle-Free Returns'}</span>
                      </div>
                      <div className="policy-pill">
                        <QrCode size={15} className="text-green" />
                        <span>{lang === 'km' ? 'សងប្រាក់តាម Bakong KHQR' : 'Instant KHQR Reversals'}</span>
                      </div>
                      <div className="policy-pill">
                        <Truck size={15} className="text-blue" />
                        <span>{lang === 'km' ? 'ប្តូរទំហំស្បែកជើងឥតគិតថ្លៃ' : 'Free Shoe Size Exchanges'}</span>
                      </div>
                    </div>

                    <div className="legal-section-block">
                      <h3>{lang === 'km' ? 'លក្ខខណ្ឌនៃការប្តូរទំនិញ និងសងប្រាក់វិញ' : 'Return & Refund Eligibility Guidelines'}</h3>
                      <ul className="legal-bullet-list">
                        <li>
                          <strong>{lang === 'km' ? 'ស្បែកជើង និងសម្លៀកបំពាក់' : 'Shoes & Apparel'}:</strong>{' '}
                          {lang === 'km' 
                            ? 'អាចប្តូរទំហំ ឬសងប្រាក់វិញបានក្នុងរយៈពេល ៣០ ថ្ងៃ ដរាបណាស្លាកសញ្ញានៅជាប់ និងមិនទាន់ប្រើប្រាស់លើតារាង។' 
                            : 'Eligible for 100% refund or free size exchange within 30 days if unused with original tags intact.'}
                        </li>
                        <li>
                          <strong>{lang === 'km' ? 'រ៉ាកែតដែលខូចខាតពេលដឹកជញ្ជូន' : 'Transit Damage'}:</strong>{' '}
                          {lang === 'km' 
                            ? 'ប្រសិនបើតួរ៉ាកែតមានបញ្ហាប្រេះស្រាំដោយសារការដឹកជញ្ជូន SmashZone នឹងដូររ៉ាកែតថ្មីភ្លាម ឬសងប្រាក់វិញ ១០០% តាម KHQR។' 
                            : 'If damaged by courier transit (VET or J&T), we replace the racket immediately or issue a 100% KHQR refund.'}
                        </li>
                        <li>
                          <strong>{lang === 'km' ? 'ការធានាតួរ៉ាកែតពីរោងចក្រ' : 'Manufacturer Frame Warranty'}:</strong>{' '}
                          {lang === 'km' 
                            ? 'រ៉ាកែតទាំងអស់មានការធានាផ្លូវការ ៦ ខែលើភាពមិនប្រក្រតីនៃសាច់កាបោនពីរោងចក្រ Yonex/Victor/Li-Ning។' 
                            : 'All official frames carry a 6-month manufacturer warranty against graphite structural defects.'}
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Interactive Refund Submission Form */}
                  <div className="interactive-refund-form-card">
                    <div className="form-card-header">
                      <RotateCcw size={20} className="text-orange" />
                      <div>
                        <h4>{t('legal.requestRefundBtn')}</h4>
                        <p>{lang === 'km' ? 'សូមបំពេញព័ត៌មានខាងក្រោមដើម្បីឱ្យក្រុមការងាររៀបចំការសងប្រាក់ជូនអ្នក' : 'Submit your order details for instant review and KHQR payout'}</p>
                      </div>
                    </div>

                    {error && (
                      <div className="auth-error-alert animate-shake">
                        <AlertCircle size={15} />
                        <span>{error}</span>
                      </div>
                    )}

                    <form onSubmit={handleRefundSubmit} className="refund-form">
                      <div className="form-row-2">
                        <div className="form-group">
                          <label className="form-label">{t('legal.orderId')} *</label>
                          <input 
                            type="text" 
                            className="form-input"
                            placeholder="e.g. ORD-9942 or SZ-582910"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">{t('legal.reason')} *</label>
                          <select 
                            className="form-input"
                            value={reasonCategory}
                            onChange={(e) => setReasonCategory(e.target.value)}
                          >
                            <option value="transit_damage">{t('legal.reasonTransit')}</option>
                            <option value="defective">{t('legal.reasonDefective')}</option>
                            <option value="wrong_size">{t('legal.reasonWrongSize')}</option>
                            <option value="wrong_string">{t('legal.reasonWrongString')}</option>
                            <option value="other">{t('legal.reasonOther')}</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-row-2">
                        <div className="form-group">
                          <label className="form-label">{lang === 'km' ? 'ឈ្មោះអតិថិជន' : 'Customer Name'} *</label>
                          <input 
                            type="text" 
                            className="form-input"
                            placeholder="e.g. Dara Chan"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">{lang === 'km' ? 'លេខទូរស័ព្ទ' : 'Phone Number'} *</label>
                          <input 
                            type="tel" 
                            className="form-input"
                            placeholder="012 888 999"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-row-2">
                        <div className="form-group">
                          <label className="form-label">{t('legal.refundMethod')}</label>
                          <select 
                            className="form-input"
                            value={refundMethod}
                            onChange={(e) => setRefundMethod(e.target.value)}
                          >
                            <option value="khqr">{t('legal.refundKhqr')}</option>
                            <option value="exchange">{t('legal.refundExchange')}</option>
                            <option value="credit">{t('legal.refundCredit')}</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="form-label">{t('legal.khqrAccount')}</label>
                          <input 
                            type="text" 
                            className="form-input"
                            placeholder="012 888 999 or Bakong ID"
                            value={khqrReceiver}
                            onChange={(e) => setKhqrReceiver(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">{t('legal.notes')}</label>
                        <textarea 
                          className="form-input refund-textarea"
                          rows={3}
                          placeholder={lang === 'km' ? 'សូមបញ្ជាក់អំពីបញ្ហានៃទំនិញ ឬទំហំដែលត្រូវប្តូរ...' : 'Please describe the defect or the new size you wish to exchange...'}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                        />
                      </div>

                      <button type="submit" className="btn btn-primary btn-lg btn-full-width">
                        <RotateCcw size={17} />
                        <span>{t('legal.submitRefundBtn')}</span>
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
