import React, { useState } from 'react';
import { Truck, QrCode, DollarSign, Save, CheckCircle, ShieldCheck } from 'lucide-react';
import { KHR_EXCHANGE_RATE } from '../../data/deliveryData';

export default function AdminDeliverySettingsTab({ 
  providers, 
  onUpdateProvider, 
  freeThreshold, 
  onUpdateThreshold,
  khqrMerchantName,
  onUpdateKhqrMerchant 
}) {
  const [threshold, setThreshold] = useState(freeThreshold);
  const [merchantName, setMerchantName] = useState(khqrMerchantName || 'SMASHZONE PRO STORE');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    onUpdateThreshold(Number(threshold));
    onUpdateKhqrMerchant(merchantName);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="admin-delivery-settings-view">
      <div className="admin-view-header">
        <div>
          <div className="specs-badge">
            <Truck size={14} />
            <span>CAMBODIA LOGISTICS &amp; PAYMENTS</span>
          </div>
          <h2 className="admin-page-title">Delivery Providers &amp; Bakong KHQR Settings</h2>
          <p className="admin-page-sub">
            Manage Cambodian courier fees, free delivery rules, and national Bakong merchant integration.
          </p>
        </div>

        {savedSuccess && (
          <div className="save-success-pill">
            <CheckCircle size={16} />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      <div className="admin-two-col-grid">
        {/* Left Column: Courier Providers Manager */}
        <div className="admin-chart-card">
          <div className="card-header-clean">
            <div>
              <h3 className="card-box-title">Active Delivery Providers</h3>
              <p className="card-box-sub">Toggle couriers and customize flat shipping rates</p>
            </div>
            <span className="courier-badge">All 25 Provinces</span>
          </div>

          <div className="admin-providers-table-wrap">
            <table className="admin-clean-table">
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>Coverage</th>
                  <th>Fee ($ USD)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {providers.map(prov => (
                  <tr key={prov.id}>
                    <td>
                      <div className="provider-table-cell">
                        {prov.logo ? (
                          <img src={prov.logo} alt={prov.name} className="provider-cell-logo" />
                        ) : (
                          <div className="provider-cell-fallback">PRO</div>
                        )}
                        <strong>{prov.name}</strong>
                      </div>
                    </td>

                    <td>
                      <span className="text-muted text-xs">
                        {prov.id === 'jalat-delivery' ? 'Phnom Penh Only' : (prov.id === 'pickup' ? 'Court 4 Pro Shop' : 'Nationwide 25 Provinces')}
                      </span>
                    </td>

                    <td>
                      <div className="fee-input-wrap">
                        <span>$</span>
                        <input 
                          type="number" 
                          step="0.5" 
                          min="0"
                          value={prov.feeUSD}
                          onChange={(e) => onUpdateProvider(prov.id, { feeUSD: parseFloat(e.target.value) || 0 })}
                          className="fee-mini-input"
                          disabled={prov.id === 'pickup'}
                        />
                      </div>
                    </td>

                    <td>
                      <button 
                        className={`btn-provider-toggle ${prov.active ? 'active' : ''}`}
                        onClick={() => onUpdateProvider(prov.id, { active: !prov.active })}
                      >
                        {prov.active ? 'Active' : 'Disabled'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Free Delivery Threshold & Bakong KHQR Settings */}
        <div className="admin-workshop-card">
          <div className="card-header-clean">
            <div>
              <h3 className="card-box-title">Rules &amp; Bakong KHQR Gateway</h3>
              <p className="card-box-sub">Free delivery trigger and payment merchant title</p>
            </div>
          </div>

          <form onSubmit={handleSaveSettings} className="delivery-settings-form">
            <div className="form-group">
              <label>Free Delivery Threshold ($ USD):</label>
              <div className="input-with-icon">
                <DollarSign size={16} className="input-icon" />
                <input 
                  type="number" 
                  value={threshold} 
                  onChange={(e) => setThreshold(e.target.value)}
                  className="settings-input"
                />
              </div>
              <span className="field-hint">
                Orders &gt; ${threshold} automatically receive free delivery across all couriers.
              </span>
            </div>

            <div className="form-group">
              <label>Bakong KHQR Merchant Title:</label>
              <div className="input-with-icon">
                <QrCode size={16} className="input-icon" />
                <input 
                  type="text" 
                  value={merchantName} 
                  onChange={(e) => setMerchantName(e.target.value)}
                  className="settings-input"
                />
              </div>
              <span className="field-hint">
                Printed on the dynamic Bakong QR code scanned by ABA, ACLEDA, and Wing apps.
              </span>
            </div>

            <div className="form-group">
              <label>Exchange Rate (Fixed Reference):</label>
              <div className="exchange-rate-pill">
                1.00 USD = <strong>{KHR_EXCHANGE_RATE.toLocaleString()} KHR</strong>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              <Save size={16} />
              <span>Save Logistics &amp; KHQR Settings</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
