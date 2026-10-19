import React, { useState } from 'react';
import { 
  X, 
  Check, 
  MapPin, 
  Truck, 
  CreditCard, 
  QrCode, 
  ChevronRight, 
  ArrowLeft, 
  CheckCircle2, 
  Printer, 
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import DeliveryMethod from './DeliveryMethod';
import KhqrPaymentPanel from './KhqrPaymentPanel';
import { CAMBODIA_PROVINCES, DEFAULT_DELIVERY_PROVIDERS, DEFAULT_FREE_DELIVERY_THRESHOLD } from '../../data/deliveryData';
import { useLanguage } from '../../context/LanguageContext';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cart, 
  onOrderCompleted, 
  deliveryProviders = DEFAULT_DELIVERY_PROVIDERS,
  freeDeliveryThreshold = DEFAULT_FREE_DELIVERY_THRESHOLD
}) {
  const { t, lang } = useLanguage();

  if (!isOpen) return null;

  // Step 1: info, 2: delivery, 3: payment, 4: review, 5: success
  const [currentStep, setCurrentStep] = useState(1);

  // Customer Form
  const [customerName, setCustomerName] = useState('Narith Chea');
  const [phone, setPhone] = useState('012 888 999');
  const [province, setProvince] = useState('Phnom Penh');
  const [address, setAddress] = useState('Street 2004, Sangkat Teuk Thla, Khan Sen Sok (Next to Court 4)');
  const [orderNotes, setOrderNotes] = useState('Please call when courier arrives at court.');

  // Delivery Provider Selection
  const [selectedProviderId, setSelectedProviderId] = useState('virak-buntham');

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState('khqr'); // 'khqr', 'cod', 'card'

  // Completed Order State
  const [completedOrder, setCompletedOrder] = useState(null);

  // Financial calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const isFreeDelivery = subtotal >= freeDeliveryThreshold;

  const selectedProvider = deliveryProviders.find(p => p.id === selectedProviderId) || deliveryProviders[0];
  const deliveryFee = (isFreeDelivery || selectedProvider.feeUSD === 0) ? 0 : selectedProvider.feeUSD;
  const totalAmount = subtotal + deliveryFee;

  const handlePlaceOrder = (isKhqrPaid = false) => {
    const orderNumber = `SZ-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: orderNumber,
      customer: customerName,
      phone,
      province,
      address,
      items: cart.map(item => ({
        name: item.name,
        qty: item.quantity,
        price: item.price,
        selectedString: item.selectedString,
        stringTension: item.stringTension
      })),
      deliveryProvider: lang === 'km' && selectedProvider.nameKm ? selectedProvider.nameKm : selectedProvider.name,
      shippingType: selectedProvider.name,
      deliveryFee,
      total: totalAmount,
      status: 'Restringing', // Initial badminton status
      date: 'Just now',
      payment: paymentMethod === 'khqr' ? (lang === 'km' ? 'Bakong KHQR (បានផ្ទៀងផ្ទាត់)' : 'Bakong KHQR (Verified)') : (paymentMethod === 'cod' ? (lang === 'km' ? 'ទូទាត់ពេលដឹកដល់ (COD)' : 'Cash on Delivery (COD)') : 'Credit Card (Paid)'),
      orderNotes
    };

    setCompletedOrder(newOrder);
    onOrderCompleted(newOrder);
    setCurrentStep(5); // Go to success screen
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container checkout-modal-box animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="checkout-modal-header">
          <div className="checkout-title-wrap">
            <h2 className="checkout-title">
              {currentStep === 5 
                ? (lang === 'km' ? 'ការបញ្ជាក់ការបញ្ជាទិញជោគជ័យ' : 'Order Confirmation') 
                : (lang === 'km' ? 'ការទូទាត់ប្រាក់ & ដឹកជញ្ជូនរហ័ស' : 'Express Checkout & Delivery')}
            </h2>
            <p className="checkout-sub">
              {currentStep === 5 
                ? (lang === 'km' ? 'សម្ភារៈរបស់អ្នកត្រូវបានកត់ត្រា និងត្រៀមដាក់ខ្សែ' : 'Your badminton gear is locked in and ready for prep') 
                : (lang === 'km' ? 'សេវាដឹកជញ្ជូនផ្ទាល់ដល់តារាងសីទូទាំង ២៥ ខេត្តក្រុង' : 'Direct-to-court express delivery across all 25 provinces')}
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Progress Stepper Bar (Only when not in success step) */}
        {currentStep < 5 && (
          <div className="checkout-steps-tracker">
            {[
              { num: 1, label: lang === 'km' ? 'ព័ត៌មាន & ខេត្ត' : 'Contact & Province' },
              { num: 2, label: lang === 'km' ? 'ក្រុមហ៊ុនដឹកជញ្ជូន' : 'Delivery Courier' },
              { num: 3, label: lang === 'km' ? 'ការទូទាត់ / KHQR' : 'Payment / KHQR' },
              { num: 4, label: lang === 'km' ? 'ពិនិត្យ & បញ្ជាក់' : 'Review & Confirm' }
            ].map(step => (
              <div 
                key={step.num} 
                className={`tracker-step ${currentStep === step.num ? 'active' : ''} ${currentStep > step.num ? 'completed' : ''}`}
                onClick={() => {
                  if (currentStep > step.num) setCurrentStep(step.num);
                }}
              >
                <div className="tracker-circle">
                  {currentStep > step.num ? <Check size={14} /> : step.num}
                </div>
                <span className="tracker-label">{step.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Body based on active step */}
        <div className="checkout-modal-body">
          {/* STEP 1: Customer Info & Cambodia Province */}
          {currentStep === 1 && (
            <div className="checkout-step-view animate-fade-in">
              <h3 className="step-title">{t('checkout.step1')}</h3>
              <p className="step-sub">
                {lang === 'km' 
                  ? 'សូមផ្តល់ព័ត៌មានទំនាក់ទំនង និងអាសយដ្ឋាន ឬឈ្មោះតារាងសីដើម្បីឱ្យអ្នកដឹកជញ្ជូនអាចទៅដល់បានលឿន។' 
                  : 'Provide your phone number and location so the courier can reach your court.'}
              </p>

              <div className="form-row">
                <div className="form-group flex-2">
                  <label>{t('checkout.fullName')}:</label>
                  <input 
                    type="text" 
                    required 
                    value={customerName} 
                    onChange={(e) => setCustomerName(e.target.value)} 
                    placeholder="e.g. Narith Chea"
                  />
                </div>
                <div className="form-group">
                  <label>{t('checkout.phoneNumber')}:</label>
                  <input 
                    type="text" 
                    required 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="012 888 999"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{t('checkout.province')}:</label>
                  <select value={province} onChange={(e) => setProvince(e.target.value)}>
                    {CAMBODIA_PROVINCES.map(p => (
                      <option key={p.en} value={p.en}>
                        {lang === 'km' ? `${p.km} (${p.en})` : `${p.en} (${p.km})`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>{t('checkout.address')}:</label>
                <input 
                  type="text" 
                  required 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  placeholder={t('checkout.addressPlaceholder')}
                />
              </div>

              <div className="form-group">
                <label>{t('checkout.notes')}:</label>
                <input 
                  type="text" 
                  value={orderNotes} 
                  onChange={(e) => setOrderNotes(e.target.value)} 
                  placeholder={t('checkout.notesPlaceholder')}
                />
              </div>

              <div className="step-nav-actions">
                <div></div>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    if (customerName.trim() && phone.trim() && address.trim()) {
                      setCurrentStep(2);
                    } else {
                      alert(lang === 'km' ? 'សូមបំពេញឈ្មោះ លេខទូរស័ព្ទ និងអាសយដ្ឋានដឹកជញ្ជូនរបស់អ្នក។' : 'Please fill in your name, phone number, and delivery address.');
                    }
                  }}
                >
                  <span>{lang === 'km' ? 'បន្តទៅសេវាដឹកជញ្ជូន' : 'Continue to Delivery Method'}</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Delivery Method (Virak Buntham, J&T, Jalat, Pickup) */}
          {currentStep === 2 && (
            <div className="checkout-step-view animate-fade-in">
              <DeliveryMethod
                value={selectedProviderId}
                onChange={setSelectedProviderId}
                providers={deliveryProviders}
                isFreeDelivery={isFreeDelivery}
              />

              <div className="step-nav-actions">
                <button 
                  className="btn btn-outline"
                  onClick={() => setCurrentStep(1)}
                >
                  <ArrowLeft size={16} />
                  <span>{lang === 'km' ? 'ត្រឡប់ទៅអាសយដ្ឋាន' : 'Back to Address'}</span>
                </button>

                <button 
                  className="btn btn-primary"
                  onClick={() => setCurrentStep(3)}
                >
                  <span>{t('checkout.continuePayment')}</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Method (Bakong KHQR, COD, Card) */}
          {currentStep === 3 && (
            <div className="checkout-step-view animate-fade-in">
              <h3 className="step-title">{t('checkout.step3')}</h3>
              <p className="step-sub">
                {lang === 'km' 
                  ? 'ទូទាត់ប្រាក់ដោយសុវត្ថិភាពតាម Bakong KHQR, សាច់ប្រាក់ពេលដឹកដល់ ឬកាតធនាគារ។' 
                  : 'Pay securely via National Bakong KHQR, Cash on Delivery, or Card.'}
              </p>

              <div className="payment-method-selector">
                <button 
                  className={`payment-tab-btn ${paymentMethod === 'khqr' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('khqr')}
                >
                  <QrCode size={18} />
                  <span>{lang === 'km' ? 'ស្កេន Bakong KHQR' : 'Bakong KHQR Scan'}</span>
                </button>

                <button 
                  className={`payment-tab-btn ${paymentMethod === 'cod' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <Truck size={18} />
                  <span>{lang === 'km' ? 'ទូទាត់ពេលដឹកដល់ (COD)' : 'Cash on Delivery (COD)'}</span>
                </button>

                <button 
                  className={`payment-tab-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard size={18} />
                  <span>{lang === 'km' ? 'កាតឥណទាន / ឥណពន្ធ' : 'Credit / Debit Card'}</span>
                </button>
              </div>

              {/* Render KHQR Panel if chosen */}
              {paymentMethod === 'khqr' && (
                <KhqrPaymentPanel
                  orderNumber={`SZ-${Math.floor(100000 + Math.random() * 900000)}`}
                  amountUsd={totalAmount}
                  onSuccess={() => handlePlaceOrder(true)}
                />
              )}

              {paymentMethod === 'cod' && (
                <div className="cod-info-box">
                  <div className="cod-icon-wrap">
                    <Truck size={32} className="text-orange" />
                  </div>
                  <h4>Pay Cash Upon Court Delivery</h4>
                  <p>You can pay the courier directly when your package is delivered to your address or badminton club.</p>
                  <div className="cod-total-pill">Total to pay on arrival: <strong>${totalAmount.toFixed(2)}</strong></div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="card-mock-form">
                  <div className="form-group">
                    <label>Card Number:</label>
                    <input type="text" placeholder="4111 2222 3333 4444" defaultValue="4111 2222 3333 4444" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date:</label>
                      <input type="text" placeholder="MM/YY" defaultValue="12/28" />
                    </div>
                    <div className="form-group">
                      <label>CVV / CVC:</label>
                      <input type="password" placeholder="123" defaultValue="888" />
                    </div>
                  </div>
                </div>
              )}

              <div className="step-nav-actions">
                <button 
                  className="btn btn-outline"
                  onClick={() => setCurrentStep(2)}
                >
                  <ArrowLeft size={16} />
                  <span>{lang === 'km' ? 'ត្រឡប់ទៅការដឹកជញ្ជូន' : 'Back to Delivery'}</span>
                </button>

                {paymentMethod !== 'khqr' && (
                  <button 
                    className="btn btn-primary"
                    onClick={() => setCurrentStep(4)}
                  >
                    <span>{lang === 'km' ? 'ពិនិត្យការបញ្ជាទិញ' : 'Review Order'}</span>
                    <ChevronRight size={18} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: Review & Final Submit */}
          {currentStep === 4 && (
            <div className="checkout-step-view animate-fade-in">
              <h3 className="step-title">{lang === 'km' ? '៤. ពិនិត្យ & បញ្ជាក់ការបញ្ជាទិញ' : '4. Review & Confirm Your Order'}</h3>

              {/* Order summary table */}
              <div className="review-order-card">
                <div className="review-items-list">
                  {cart.map(item => (
                    <div key={item.id} className="review-item-row">
                      <img src={item.image} alt={item.name} className="review-item-thumb" />
                      <div className="review-item-info">
                        <strong>{item.name} (x{item.quantity})</strong>
                        {item.selectedString && (
                          <div className="review-item-specs">
                            <span>{lang === 'km' ? 'ខ្សែ' : 'String'}: {item.selectedString}</span>
                            <span>{lang === 'km' ? 'កម្លាំង' : 'Tension'}: {item.stringTension} lbs</span>
                          </div>
                        )}
                      </div>
                      <span className="review-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="review-costs-breakdown">
                  <div className="cost-row">
                    <span>{t('cart.subtotal')}:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="cost-row">
                    <span>{t('checkout.deliveryFee')} ({lang === 'km' && selectedProvider.nameKm ? selectedProvider.nameKm : selectedProvider.name}):</span>
                    <span>{deliveryFee === 0 ? <strong className="text-green">{lang === 'km' ? 'ឥតគិតថ្លៃ' : 'FREE'}</strong> : `$${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <div className="cost-row total-row">
                    <strong>{t('checkout.totalAmount')}:</strong>
                    <strong className="grand-total-text">${totalAmount.toFixed(2)}</strong>
                  </div>
                </div>
              </div>

              <div className="review-destination-summary">
                <MapPin size={16} className="text-accent" />
                <span>{t('nav.deliverTo')}: <strong>{customerName}</strong> ({phone}) &bull; {address}, {province}</span>
              </div>

              <div className="step-nav-actions">
                <button 
                  className="btn btn-outline"
                  onClick={() => setCurrentStep(3)}
                >
                  <ArrowLeft size={16} />
                  <span>{lang === 'km' ? 'ត្រឡប់ទៅការបង់ប្រាក់' : 'Back to Payment'}</span>
                </button>

                <button 
                  className="btn btn-primary btn-lg"
                  onClick={() => handlePlaceOrder(false)}
                >
                  <span>{lang === 'km' ? 'បញ្ជាក់បញ្ជាទិញ' : 'Place Order'} &bull; ${totalAmount.toFixed(2)}</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Order Completed & Tracking Information */}
          {currentStep === 5 && completedOrder && (
            <div className="order-success-view animate-fade-in">
              <div className="success-icon-badge">
                <CheckCircle2 size={54} className="text-green" />
              </div>

              <h2 className="success-title">{t('khqr.orderSuccess')}</h2>
              <p className="success-sub">
                {lang === 'km' ? (
                  <>
                    សូមអរគុណ <strong>{completedOrder.customer}</strong>។ សម្ភារៈវាយសីរបស់អ្នកត្រូវបានកំណត់ពេលដាក់ខ្សែ និងរៀបចំចេញដឹកជញ្ជូនរហ័ស។
                  </>
                ) : (
                  <>
                    Thank you, <strong>{completedOrder.customer}</strong>. Your tournament equipment has been scheduled for stringing and express courier transit.
                  </>
                )}
              </p>

              <div className="success-order-card">
                <div className="order-receipt-row">
                  <span className="receipt-label">{lang === 'km' ? 'លេខកូដបញ្ជាទិញ' : 'Order Number'}:</span>
                  <span className="receipt-val order-num-highlight">{completedOrder.id}</span>
                </div>
                <div className="order-receipt-row">
                  <span className="receipt-label">{lang === 'km' ? 'ក្រុមហ៊ុនដឹកជញ្ជូន' : 'Courier Service'}:</span>
                  <span className="receipt-val">{completedOrder.deliveryProvider}</span>
                </div>
                <div className="order-receipt-row">
                  <span className="receipt-label">{lang === 'km' ? 'រាជធានី / ខេត្ត' : 'Destination Province'}:</span>
                  <span className="receipt-val">{completedOrder.province}</span>
                </div>
                <div className="order-receipt-row">
                  <span className="receipt-label">{lang === 'km' ? 'ស្ថានភាពការទូទាត់' : 'Payment Status'}:</span>
                  <span className="receipt-val text-green font-bold">{completedOrder.payment}</span>
                </div>
                <div className="order-receipt-row">
                  <span className="receipt-label">{lang === 'km' ? 'ចំនួនប្រាក់សរុប' : 'Total Charged'}:</span>
                  <span className="receipt-val grand-val">${completedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="success-actions-row">
                <button 
                  className="btn btn-outline"
                  onClick={() => window.print()}
                >
                  <Printer size={16} />
                  <span>{lang === 'km' ? 'បោះពុម្ពវិក្កយបត្រ' : 'Print Receipt'}</span>
                </button>

                <button 
                  className="btn btn-primary"
                  onClick={onClose}
                >
                  <span>{t('cart.startShopping')}</span>
                </button>
              </div>

              <div className="success-trust-note">
                <ShieldCheck size={14} className="text-green" />
                <span>
                  {lang === 'km' 
                    ? <>អ្នកអាចតាមដានការបញ្ជាទិញនេះគ្រប់ពេលវេលាដោយប្រើលេខកូដ <strong>{completedOrder.id}</strong> ក្នុងឧបករណ៍តាមដានការបញ្ជាទិញ។</>
                    : <>You can track this order at any time using order number <strong>{completedOrder.id}</strong> in the Track Order tool.</>}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
