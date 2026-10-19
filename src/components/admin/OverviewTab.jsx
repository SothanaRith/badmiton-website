import React from 'react';
import { 
  DollarSign, 
  ShoppingBag, 
  Wrench, 
  AlertTriangle, 
  TrendingUp, 
  ArrowUpRight,
  Clock,
  CheckCircle,
  Plus
} from 'lucide-react';
import { MONTHLY_SALES_DATA } from '../../data/adminData';

export default function OverviewTab({ 
  orders, 
  stringingJobs, 
  lowStockItems, 
  products, 
  onSwitchTab,
  onOpenAddProduct 
}) {
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 48250;
  const inProgressJobs = stringingJobs.filter(j => j.status === 'in_progress' || j.status === 'received').length;

  return (
    <div className="admin-overview-view">
      {/* Top Welcome & Quick Actions */}
      <div className="admin-view-header">
        <div>
          <h2 className="admin-page-title">Operations &amp; Sales Command Center</h2>
          <p className="admin-page-sub">Real-time overview of badminton retail, court deliveries, and certified restringing.</p>
        </div>

        <div className="admin-header-actions">
          <button 
            className="btn btn-primary btn-sm"
            onClick={onOpenAddProduct}
          >
            <Plus size={16} />
            <span>Add New Equipment</span>
          </button>
          <button 
            className="btn btn-outline btn-sm"
            onClick={() => onSwitchTab('stringing')}
          >
            <Wrench size={15} />
            <span>View Stringing Queue</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="admin-kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon-wrap kpi-revenue">
            <DollarSign size={24} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Gross Revenue (October)</span>
            <div className="kpi-val-row">
              <span className="kpi-value">${totalRevenue.toLocaleString()}</span>
              <span className="kpi-growth positive">
                <ArrowUpRight size={14} /> +14.2%
              </span>
            </div>
            <span className="kpi-sub">vs $42,850 last month</span>
          </div>
        </div>

        <div className="kpi-card" onClick={() => onSwitchTab('stringing')} style={{ cursor: 'pointer' }}>
          <div className="kpi-icon-wrap kpi-stringing">
            <Wrench size={24} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Active Stringing Jobs</span>
            <div className="kpi-val-row">
              <span className="kpi-value">{inProgressJobs} Rackets</span>
              <span className="kpi-badge-live">LIVE QUEUE</span>
            </div>
            <span className="kpi-sub">Avg turnaround: 3.5 hrs</span>
          </div>
        </div>

        <div className="kpi-card" onClick={() => onSwitchTab('orders')} style={{ cursor: 'pointer' }}>
          <div className="kpi-icon-wrap kpi-orders">
            <ShoppingBag size={24} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Total Orders Handled</span>
            <div className="kpi-val-row">
              <span className="kpi-value">{orders.length + 338}</span>
              <span className="kpi-growth positive">
                <ArrowUpRight size={14} /> +8.6%
              </span>
            </div>
            <span className="kpi-sub">98.4% on-time court dispatch</span>
          </div>
        </div>

        <div className="kpi-card" onClick={() => onSwitchTab('lowstock')} style={{ cursor: 'pointer' }}>
          <div className="kpi-icon-wrap kpi-alerts">
            <AlertTriangle size={24} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Low Stock Warnings</span>
            <div className="kpi-val-row">
              <span className="kpi-value text-red">{lowStockItems.length} Consumables</span>
            </div>
            <span className="kpi-sub">Shuttles &amp; strings below reorder mark</span>
          </div>
        </div>
      </div>

      {/* Grid: Sales Graph & Restringing Machine Live Status */}
      <div className="admin-two-col-grid">
        {/* Sales Chart Card */}
        <div className="admin-chart-card">
          <div className="card-header-clean">
            <div>
              <h3 className="card-box-title">Revenue &amp; Equipment Sales Trend</h3>
              <p className="card-box-sub">Monthly breakdown (Equipment vs Stringing Revenue)</p>
            </div>
            <span className="chart-legend-badge">
              <span className="dot dot-orange"></span> Revenue ($)
            </span>
          </div>

          <div className="sales-chart-container">
            <div className="bar-chart-visual">
              {MONTHLY_SALES_DATA.map((item, idx) => {
                const maxRev = 55000;
                const heightPercent = Math.round((item.revenue / maxRev) * 100);

                return (
                  <div key={item.month} className="bar-column-group">
                    <div className="bar-val-tooltip">${(item.revenue / 1000).toFixed(1)}k</div>
                    <div className="bar-track">
                      <div 
                        className="bar-fill" 
                        style={{ height: `${heightPercent}%` }}
                      ></div>
                    </div>
                    <span className="bar-label">{item.month}</span>
                    <span className="bar-sub-label">{item.rackets} racquets</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Machine & Workshop Live Status */}
        <div className="admin-workshop-card">
          <div className="card-header-clean">
            <div>
              <h3 className="card-box-title">Electronic Stringing Workshop</h3>
              <p className="card-box-sub">Real-time status of calibrated BWF tournament machines</p>
            </div>
            <span className="status-live-dot">● 2 Online</span>
          </div>

          <div className="workshop-machines-list">
            <div className="machine-item busy">
              <div className="machine-top">
                <span className="machine-name">Yonex Precision 9.0 Pro (#01)</span>
                <span className="badge-machine busy">STRUNG @ 27 LBS</span>
              </div>
              <p className="machine-detail">Currently stringing: <strong>Yonex Astrox 100 ZZ</strong> for Marcus Tan</p>
              <div className="machine-progress">
                <div className="machine-progress-bar" style={{ width: '65%' }}></div>
              </div>
              <span className="machine-time-left">
                <Clock size={12} /> Approx 12 mins remaining
              </span>
            </div>

            <div className="machine-item available">
              <div className="machine-top">
                <span className="machine-name">Victor Electronic C-7032 Pro (#02)</span>
                <span className="badge-machine ready">READY FOR QUEUE</span>
              </div>
              <p className="machine-detail">Next in line: <strong>Yonex Nanoflare 1000Z</strong> (Aerobite @ 29 lbs)</p>
              <button 
                className="btn btn-outline btn-xs"
                onClick={() => onSwitchTab('stringing')}
              >
                Load Job Ticket →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Overview Table */}
      <div className="admin-table-card">
        <div className="card-header-clean">
          <div>
            <h3 className="card-box-title">Recent Equipment &amp; Restringing Orders</h3>
            <p className="card-box-sub">Latest customer dispatches and court delivery requests</p>
          </div>
          <button 
            className="btn btn-outline btn-xs"
            onClick={() => onSwitchTab('orders')}
          >
            View All Orders ({orders.length}) →
          </button>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-clean-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items Ordered</th>
                <th>Delivery Method</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 4).map(order => (
                <tr key={order.id}>
                  <td><strong>{order.id}</strong></td>
                  <td>{order.customer}</td>
                  <td>
                    {order.items.map((i, idx) => (
                      <span key={idx} className="item-order-pill">
                        {i.name} (x{i.qty})
                      </span>
                    ))}
                  </td>
                  <td>{order.shippingType}</td>
                  <td><strong>${order.total.toFixed(2)}</strong></td>
                  <td>
                    <span className={`status-badge-order ${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
