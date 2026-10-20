import React, { useState } from 'react';
import { 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  QrCode, 
  Clock, 
  Search, 
  DollarSign
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function RefundsManagerTab({ 
  refunds = [], 
  onUpdateRefundStatus 
}) {
  const { lang } = useLanguage();
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRefunds = refunds.filter(item => {
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.item.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingCount = refunds.filter(r => r.status === 'pending').length;
  const approvedCount = refunds.filter(r => r.status === 'approved').length;
  const totalRefundAmount = refunds.reduce((sum, r) => sum + (r.amount || 0), 0);

  const getReasonBadge = (cat) => {
    switch (cat) {
      case 'transit_damage':
        return { label: lang === 'km' ? 'ខូចខាតពេលដឹក' : 'Transit Damage', color: 'badge-red' };
      case 'defective':
        return { label: lang === 'km' ? 'កំហុសពីរោងចក្រ' : 'Factory Defect', color: 'badge-purple' };
      case 'wrong_size':
        return { label: lang === 'km' ? 'ខុសទំហំ' : 'Wrong Size', color: 'badge-blue' };
      case 'wrong_string':
        return { label: lang === 'km' ? 'ខុសខ្សែ/កម្លាំង' : 'Wrong String/Tension', color: 'badge-orange' };
      default:
        return { label: lang === 'km' ? 'ផ្សេងៗ' : 'Other', color: 'badge-gray' };
    }
  };

  return (
    <div className="refunds-manager-tab animate-fade-in">
      {/* Top Metric Cards */}
      <div className="admin-stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrap stat-orange">
            <Clock size={22} />
          </div>
          <div className="stat-details">
            <span className="stat-label">{lang === 'km' ? 'សំណើរង់ចាំពិនិត្យ' : 'Pending Requests'}</span>
            <span className="stat-value">{pendingCount}</span>
            <span className="stat-sub text-orange">{lang === 'km' ? 'ត្រូវត្រួតពិនិត្យ និងវេរប្រាក់' : 'Action required'}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap stat-green">
            <CheckCircle2 size={22} />
          </div>
          <div className="stat-details">
            <span className="stat-label">{lang === 'km' ? 'បានសងប្រាក់ជោគជ័យ' : 'Approved Refunds'}</span>
            <span className="stat-value">{approvedCount}</span>
            <span className="stat-sub text-green">{lang === 'km' ? 'ផ្ទេរតាម Bakong KHQR រួច' : 'Settled via Bakong'}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap stat-blue">
            <RotateCcw size={22} />
          </div>
          <div className="stat-details">
            <span className="stat-label">{lang === 'km' ? 'សរុបសំបុត្រប្តូរទំនិញ' : 'Total Return Tickets'}</span>
            <span className="stat-value">{refunds.length}</span>
            <span className="stat-sub">{lang === 'km' ? 'គោលការណ៍ ៣០ ថ្ងៃ' : '30-Day Policy'}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap stat-purple">
            <DollarSign size={22} />
          </div>
          <div className="stat-details">
            <span className="stat-label">{lang === 'km' ? 'ទឹកប្រាក់សងសរុប' : 'Total Refund Value'}</span>
            <span className="stat-value">${totalRefundAmount.toFixed(2)}</span>
            <span className="stat-sub">{lang === 'km' ? 'ដុល្លារ & រៀល (KHQR)' : 'USD & KHR Reversals'}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="tab-control-bar">
        <div className="control-search-box">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder={lang === 'km' ? 'ស្វែងរកតាមលេខសំបុត្រ លេខបញ្ជាទិញ ឬឈ្មោះអតិថិជន...' : 'Search by ticket #, order ID, customer name...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="status-filter-pills">
          <button 
            className={`filter-pill ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            {lang === 'km' ? 'ទាំងអស់' : 'All'} ({refunds.length})
          </button>
          <button 
            className={`filter-pill ${filterStatus === 'pending' ? 'active' : ''}`}
            onClick={() => setFilterStatus('pending')}
          >
            {lang === 'km' ? 'រង់ចាំ' : 'Pending'} ({pendingCount})
          </button>
          <button 
            className={`filter-pill ${filterStatus === 'approved' ? 'active' : ''}`}
            onClick={() => setFilterStatus('approved')}
          >
            {lang === 'km' ? 'បានសង' : 'Approved'} ({approvedCount})
          </button>
        </div>
      </div>

      {/* Refunds Table */}
      <div className="admin-table-container">
        <table className="admin-data-table">
          <thead>
            <tr>
              <th>{lang === 'km' ? 'លេខសំបុត្រ' : 'Ticket ID'}</th>
              <th>{lang === 'km' ? 'លេខបញ្ជាទិញ' : 'Order ID'}</th>
              <th>{lang === 'km' ? 'អតិថិជន' : 'Customer'}</th>
              <th>{lang === 'km' ? 'ទំនិញ & ទឹកប្រាក់' : 'Item & Amount'}</th>
              <th>{lang === 'km' ? 'មូលហេតុ' : 'Reason'}</th>
              <th>{lang === 'km' ? 'វិធីសាស្ត្រ & KHQR' : 'Resolution & KHQR'}</th>
              <th>{lang === 'km' ? 'ស្ថានភាព' : 'Status'}</th>
              <th className="text-right">{lang === 'km' ? 'សកម្មភាព' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody>
            {filteredRefunds.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-muted">
                  {lang === 'km' ? 'មិនមានសំណើសងប្រាក់ទេ' : 'No refund or return requests found.'}
                </td>
              </tr>
            ) : (
              filteredRefunds.map(refund => {
                const badge = getReasonBadge(refund.reasonCategory);
                return (
                  <tr key={refund.id}>
                    <td>
                      <span className="ticket-id-tag font-bold text-orange">{refund.id}</span>
                      <div className="text-xs text-muted">{refund.createdAt}</div>
                    </td>
                    <td>
                      <strong>#{refund.orderId}</strong>
                    </td>
                    <td>
                      <div className="font-semibold">{refund.customerName}</div>
                      <div className="text-xs text-muted">{refund.phone}</div>
                    </td>
                    <td>
                      <div className="table-item-name">{refund.item}</div>
                      <div className="text-sm font-bold text-green">${(refund.amount || 0).toFixed(2)}</div>
                    </td>
                    <td>
                      <span className={`status-pill ${badge.color}`}>{badge.label}</span>
                      <div className="text-xs text-muted mt-1 max-w-xs truncate" title={refund.reasonText}>
                        {refund.reasonText}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1 font-semibold text-xs">
                        <QrCode size={13} className="text-green" />
                        <span>Bakong KHQR</span>
                      </div>
                      <div className="text-xs text-muted">{refund.khqrReceiver}</div>
                    </td>
                    <td>
                      <span className={`status-badge ${refund.status}`}>
                        {refund.status === 'approved' 
                          ? (lang === 'km' ? 'បានសងរួច' : 'Approved') 
                          : (refund.status === 'rejected' 
                              ? (lang === 'km' ? 'បដិសេធ' : 'Rejected') 
                              : (lang === 'km' ? 'រង់ចាំពិនិត្យ' : 'Pending'))}
                      </span>
                    </td>
                    <td className="text-right">
                      {refund.status === 'pending' ? (
                        <div className="action-btns-row justify-end">
                          <button 
                            className="btn btn-sm btn-success"
                            onClick={() => onUpdateRefundStatus(refund.id, 'approved')}
                            title={lang === 'km' ? 'អនុម័ត និងផ្ទេរប្រាក់ KHQR' : 'Approve Bakong Refund'}
                          >
                            <CheckCircle2 size={14} />
                            <span>{lang === 'km' ? 'អនុម័ត KHQR' : 'Approve'}</span>
                          </button>
                          <button 
                            className="btn btn-sm btn-outline text-red"
                            onClick={() => onUpdateRefundStatus(refund.id, 'rejected')}
                            title={lang === 'km' ? 'បដិសេធ' : 'Decline'}
                          >
                            <XCircle size={14} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted">
                          {refund.status === 'approved' 
                            ? (lang === 'km' ? 'បានវេរប្រាក់រួច' : 'Settled') 
                            : (lang === 'km' ? 'បានបិទ' : 'Closed')}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
