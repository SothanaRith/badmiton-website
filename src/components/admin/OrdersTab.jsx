import React, { useState } from 'react';
import { ShoppingBag, Search, Filter, Truck, CheckCircle, Clock } from 'lucide-react';

export default function OrdersTab({ orders, onUpdateOrderStatus }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = orders.filter(o => {
    const matchesFilter = filter === 'all' || o.status.toLowerCase().includes(filter.toLowerCase());
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) || 
      o.customer.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="admin-orders-view">
      <div className="admin-view-header">
        <div>
          <h2 className="admin-page-title">Orders &amp; Court Deliveries</h2>
          <p className="admin-page-sub">
            Track and fulfill equipment purchases and tournament stringing orders.
          </p>
        </div>
      </div>

      <div className="admin-filter-bar">
        <div className="admin-search-wrap">
          <Search size={16} className="admin-search-icon" />
          <input 
            type="text" 
            placeholder="Search by order ID or customer name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-search-input"
          />
        </div>

        <div className="admin-cat-pills">
          {['all', 'Restringing', 'Ready to Dispatch', 'Completed'].map(status => (
            <button
              key={status}
              className={`cat-pill ${filter === status ? 'active' : ''}`}
              onClick={() => setFilter(status)}
            >
              {status === 'all' ? 'All Orders' : status}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-wrap">
          <table className="admin-clean-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date &amp; Time</th>
                <th>Customer</th>
                <th>Ordered Items</th>
                <th>Shipping Method</th>
                <th>Payment</th>
                <th>Total</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => (
                <tr key={order.id}>
                  <td><strong>{order.id}</strong></td>
                  <td><span className="text-muted">{order.date}</span></td>
                  <td><strong>{order.customer}</strong></td>
                  <td>
                    <div className="order-items-col">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="item-order-pill">
                          {it.name} <strong className="item-qty">x{it.qty}</strong>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className="shipping-type-pill">{order.shippingType}</span>
                  </td>
                  <td>
                    <span className="payment-pill">{order.payment}</span>
                  </td>
                  <td>
                    <strong className="table-price-text">${order.total.toFixed(2)}</strong>
                  </td>
                  <td>
                    <span className={`status-badge-order ${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <select 
                      className="order-status-select"
                      value={order.status}
                      onChange={(e) => onUpdateOrderStatus(order.id, e.target.value)}
                    >
                      <option value="Restringing">Restringing</option>
                      <option value="Ready to Dispatch">Ready to Dispatch</option>
                      <option value="Completed">Completed</option>
                    </select>
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
