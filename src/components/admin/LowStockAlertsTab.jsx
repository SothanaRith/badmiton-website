import React from 'react';
import { AlertTriangle, Package, RefreshCw, CheckCircle, Truck, ArrowRight } from 'lucide-react';

export default function LowStockAlertsTab({ items, onRestockItem }) {
  return (
    <div className="admin-lowstock-view">
      <div className="admin-view-header">
        <div>
          <div className="alert-badge-pill">
            <AlertTriangle size={14} />
            <span>CRITICAL INVENTORY CONSUMABLES</span>
          </div>
          <h2 className="admin-page-title">Low Stock Warnings &amp; Reorder Triggers</h2>
          <p className="admin-page-sub">
            Automated alerts when tournament shuttle tubes, 200m string reels, or overgrip rolls fall below threshold.
          </p>
        </div>
      </div>

      {/* Grid of Alert Cards */}
      <div className="lowstock-cards-grid">
        {items.map(item => (
          <div key={item.id} className="lowstock-card">
            <div className="lowstock-card-top">
              <span className="lowstock-cat-pill">{item.category}</span>
              <span className="lowstock-urgency-badge">REORDER NEEDED</span>
            </div>

            <h3 className="lowstock-item-title">{item.name}</h3>

            <div className="lowstock-metrics-box">
              <div className="metric-col">
                <span className="metric-label">Current Stock</span>
                <span className="metric-val text-red">{item.currentStock} {item.unit}</span>
              </div>

              <div className="metric-divider"></div>

              <div className="metric-col">
                <span className="metric-label">Reorder Level</span>
                <span className="metric-val">{item.reorderLevel} {item.unit}</span>
              </div>
            </div>

            {/* Visual stock bar */}
            <div className="stock-visual-bar-wrap">
              <div 
                className="stock-visual-bar-fill" 
                style={{ width: `${Math.min(100, Math.round((item.currentStock / item.reorderLevel) * 100))}%` }}
              ></div>
            </div>

            <div className="burnrate-note">
              <strong>Burn Rate:</strong> {item.burnRate}
            </div>

            <div className="lowstock-actions">
              <button 
                className="btn btn-primary btn-sm btn-full"
                onClick={() => onRestockItem(item.id, 25)}
              >
                <RefreshCw size={14} />
                <span>Quick Restock (+25 Units)</span>
              </button>

              <button 
                className="btn btn-outline btn-sm btn-full"
                onClick={() => alert(`Purchase Order sent to official distributor for ${item.name}!`)}
              >
                <Truck size={14} />
                <span>PO to Official Distributor</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
