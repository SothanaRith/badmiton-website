import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Package, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Wrench, 
  MapPin, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TrackOrderModal({ isOpen, onClose, orders }) {
  const { t, lang } = useLanguage();

  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('ORD-9942');
  const [searchedOrder, setSearchedOrder] = useState(
    orders.find(o => o.id === 'ORD-9942') || orders[0] || null
  );
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const found = orders.find(o => 
      o.id.toLowerCase() === searchQuery.trim().toLowerCase() ||
      (o.phone && o.phone.includes(searchQuery.trim())) ||
      (o.customer && o.customer.toLowerCase().includes(searchQuery.trim().toLowerCase()))
    );

    if (found) {
      setSearchedOrder(found);
      setErrorMsg('');
    } else {
      setErrorMsg(lang === 'km' 
        ? `រកមិនឃើញការបញ្ជាទិញដែលត្រូវនឹង "${searchQuery}" ទេ។ សូមពិនិត្យលេខកូដ ឬលេខទូរស័ព្ទរបស់អ្នកឡើងវិញ។` 
        : `No order found matching "${searchQuery}". Please check your order ID or phone number.`);
    }
  };

  const getStepIndex = (status) => {
    switch (status?.toLowerCase()) {
      case 'received':
      case 'placed':
        return 0;
      case 'confirmed':
        return 1;
      case 'restringing':
      case 'in_progress':
      case 'qc_passed':
        return 2;
      case 'ready to dispatch':
      case 'shipped':
      case 'in transit':
      case 'dispatched':
        return 3;
      case 'completed':
      case 'delivered':
        return 4;
      default:
        return 2;
    }
  };

  const currentStep = getStepIndex(searchedOrder?.status);

  const steps = [
    { 
      label: lang === 'km' ? 'បានបញ្ជាទិញ' : 'Order Placed', 
      desc: lang === 'km' ? 'បានទទួលក្នុងប្រព័ន្ធ' : 'Received in system', 
      icon: Clock 
    },
    { 
      label: lang === 'km' ? 'បានបញ្ជាក់ការបង់ប្រាក់' : 'Payment Confirmed', 
      desc: lang === 'km' ? 'Bakong / Card ផ្ទៀងផ្ទាត់រួច' : 'Bakong / Card Verified', 
      icon: ShieldCheck 
    },
    { 
      label: lang === 'km' ? 'កំពុងដាក់ខ្សែ & QC' : 'Restringing & QC', 
      desc: lang === 'km' ? 'ម៉ាស៊ីនអេឡិចត្រូនិចតាមកម្លាំងទាញ' : 'Electronic machine @ tension', 
      icon: Wrench 
    },
    { 
      label: lang === 'km' ? 'កំពុងដឹកជញ្ជូន' : 'In Transit', 
      desc: searchedOrder?.deliveryProvider || 'VET Express / J&T Courier', 
      icon: Truck 
    },
    { 
      label: lang === 'km' ? 'បានដឹកដល់' : 'Delivered', 
      desc: lang === 'km' ? 'ដឹកដល់តារាងសី ឬផ្ទះរួចរាល់' : 'Delivered to court/doorstep', 
      icon: CheckCircle2 
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container track-order-modal animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="modal-icon-badge">
              <Truck size={20} />
            </div>
            <div>
              <h2 className="modal-title">{t('track.title')}</h2>
              <p className="modal-sub">
                {lang === 'km' 
                  ? 'តាមដានស្ថានភាពដឹកជញ្ជូនកម្ពុជា និងការងារដាក់ខ្សែរ៉ាកែតជាក់ស្តែង' 
                  : 'Real-time Cambodian courier tracking & stringing progress'}
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="track-order-body">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="track-search-form">
            <div className="track-input-group">
              <Search size={18} className="track-search-icon" />
              <input 
                type="text" 
                placeholder={lang === 'km' ? 'បញ្ចូលលេខកូដបញ្ជាទិញ (ឧ. ORD-9942, SZ-123456) ឬលេខទូរស័ព្ទ...' : 'Enter Order ID (e.g. ORD-9942, SZ-123456) or Phone Number...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="track-search-input"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {t('track.btn')}
            </button>
          </form>

          {/* Quick Demo Pre-fills */}
          <div className="track-demo-pills">
            <span className="demo-hint-label">Try demo orders:</span>
            {orders.slice(0, 3).map(o => (
              <button 
                key={o.id} 
                className="demo-order-btn"
                onClick={() => {
                  setSearchQuery(o.id);
                  setSearchedOrder(o);
                  setErrorMsg('');
                }}
              >
                {o.id} ({o.customer})
              </button>
            ))}
          </div>

          {errorMsg && (
            <div className="track-error-banner">
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Results timeline */}
          {searchedOrder && (
            <div className="track-result-card animate-fade-in">
              <div className="track-result-header">
                <div>
                  <span className="track-order-tag">{lang === 'km' ? 'លេខកូដបញ្ជាទិញ #' : 'ORDER #'}{searchedOrder.id}</span>
                  <h3 className="track-customer-name">{searchedOrder.customer}</h3>
                  <div className="track-courier-row">
                    <Truck size={14} className="text-orange" />
                    <span>{lang === 'km' ? 'ក្រុមហ៊ុនដឹកជញ្ជូន' : 'Courier'}: <strong>{searchedOrder.deliveryProvider || searchedOrder.shippingType}</strong></span>
                  </div>
                </div>

                <div className="track-status-pill-box">
                  <span className={`status-badge-order ${searchedOrder.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {searchedOrder.status}
                  </span>
                  <span className="track-date">{searchedOrder.date}</span>
                </div>
              </div>

              {/* 5-Step Visual Progress Timeline */}
              <div className="track-timeline">
                {steps.map((st, idx) => {
                  const Icon = st.icon;
                  const isPassed = idx <= currentStep;
                  const isCurrent = idx === currentStep;

                  return (
                    <div key={idx} className={`timeline-step ${isPassed ? 'passed' : ''} ${isCurrent ? 'current' : ''}`}>
                      <div className="timeline-node">
                        <Icon size={16} />
                      </div>
                      <div className="timeline-text">
                        <span className="timeline-label">{st.label}</span>
                        <span className="timeline-desc">{st.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Destination & Ordered Items Card */}
              <div className="track-details-grid">
                <div className="track-col-box">
                  <h4 className="track-col-title">
                    <MapPin size={15} /> {lang === 'km' ? 'ទីតាំងទទួលទំនិញ' : 'Delivery Destination'}
                  </h4>
                  <p className="track-text">
                    {searchedOrder.address ? `${searchedOrder.address}, ${searchedOrder.province}` : 'Court 4, National Olympic Stadium, Phnom Penh'}
                  </p>
                  <p className="track-sub-text">{lang === 'km' ? 'ការទូទាត់' : 'Payment'}: {searchedOrder.payment}</p>
                </div>

                <div className="track-col-box">
                  <h4 className="track-col-title">
                    <Package size={15} /> {lang === 'km' ? 'សម្ភារៈដែលបានកុម្ម៉ង់' : 'Ordered Equipment'}
                  </h4>
                  <ul className="track-items-mini-list">
                    {searchedOrder.items.map((item, i) => (
                      <li key={i}>
                        <span>{item.name} <strong>x{item.qty}</strong></span>
                        {item.stringTension && (
                          <span className="mini-tension-tag">{item.stringTension} lbs</span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="track-total-row">
                    <span>{lang === 'km' ? 'សរុបការបញ្ជាទិញ' : 'Order Total'}:</span>
                    <strong>${searchedOrder.total.toFixed(2)}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
