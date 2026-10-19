import React, { useState } from 'react';
import { 
  Wrench, 
  Clock, 
  CheckCircle, 
  Truck, 
  Plus, 
  AlertCircle, 
  Gauge, 
  User, 
  ArrowRight,
  Sparkles,
  X
} from 'lucide-react';

export default function StringingQueueTab({ jobs, onUpdateJobStatus, onAddJob }) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddTicket, setShowAddTicket] = useState(false);

  // New ticket form state
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [racket, setRacket] = useState('Yonex Astrox 100 ZZ');
  const [stringName, setStringName] = useState('Yonex BG80 (0.68mm)');
  const [tension, setTension] = useState(26);
  const [notes, setNotes] = useState('');

  const filteredJobs = jobs.filter(job => {
    if (filterStatus === 'all') return true;
    return job.status === filterStatus;
  });

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!customerName.trim()) return;

    const newTicket = {
      id: `STR-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      phone,
      racket,
      string: stringName,
      tension: Number(tension),
      technician: 'Master Stringer Kenji',
      status: 'received',
      machine: 'Yonex Precision 9.0 Pro',
      createdAt: 'Just now',
      notes: notes || 'Standard 4-knot tournament pattern.'
    };

    onAddJob(newTicket);
    setShowAddTicket(false);
    setCustomerName('');
    setPhone('');
    setNotes('');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'received':
        return <span className="job-badge received"><Clock size={12} /> Received / Queued</span>;
      case 'in_progress':
        return <span className="job-badge in-progress"><Wrench size={12} /> On Machine Strung</span>;
      case 'qc_passed':
        return <span className="job-badge qc-passed"><CheckCircle size={12} /> QC Tension Passed</span>;
      case 'dispatched':
        return <span className="job-badge dispatched"><Truck size={12} /> Court Dispatched</span>;
      default:
        return null;
    }
  };

  return (
    <div className="admin-stringing-view">
      {/* Header */}
      <div className="admin-view-header">
        <div>
          <div className="specs-badge">
            <Wrench size={14} />
            <span>CERTIFIED BWF WORKSHOP</span>
          </div>
          <h2 className="admin-page-title">Restringing Queue &amp; Tension Control</h2>
          <p className="admin-page-sub">
            Track customer racket restringing tickets from machine calibration to court delivery.
          </p>
        </div>

        <button 
          className="btn btn-primary"
          onClick={() => setShowAddTicket(true)}
        >
          <Plus size={16} />
          <span>New Walk-in Stringing Ticket</span>
        </button>
      </div>

      {/* Workflow Tabs */}
      <div className="stringing-status-tabs">
        {[
          { id: 'all', label: 'All Jobs', count: jobs.length },
          { id: 'received', label: '1. Received in Queue', count: jobs.filter(j => j.status === 'received').length },
          { id: 'in_progress', label: '2. Stringing on Machine', count: jobs.filter(j => j.status === 'in_progress').length },
          { id: 'qc_passed', label: '3. QC Tension Passed', count: jobs.filter(j => j.status === 'qc_passed').length },
          { id: 'dispatched', label: '4. Dispatched to Court', count: jobs.filter(j => j.status === 'dispatched').length }
        ].map(tab => (
          <button
            key={tab.id}
            className={`status-tab-btn ${filterStatus === tab.id ? 'active' : ''}`}
            onClick={() => setFilterStatus(tab.id)}
          >
            <span>{tab.label}</span>
            <span className="tab-count-pill">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Stringing Tickets Grid */}
      <div className="stringing-cards-grid">
        {filteredJobs.map(job => (
          <div key={job.id} className={`stringing-ticket-card ${job.status}`}>
            <div className="ticket-top">
              <span className="ticket-id">{job.id}</span>
              {getStatusBadge(job.status)}
            </div>

            <div className="ticket-customer-row">
              <User size={15} className="text-muted" />
              <strong>{job.customerName}</strong>
              <span className="ticket-phone">{job.phone}</span>
            </div>

            <div className="ticket-racket-box">
              <span className="ticket-box-label">Racket:</span>
              <h4 className="ticket-racket-name">{job.racket}</h4>
            </div>

            <div className="ticket-specs-box">
              <div className="ticket-spec-item">
                <span className="spec-lbl">String:</span>
                <span className="spec-val">{job.string}</span>
              </div>
              <div className="ticket-spec-item highlight-tension">
                <span className="spec-lbl">Tension:</span>
                <span className="spec-val tension-bold">
                  <Gauge size={14} /> {job.tension} lbs
                </span>
              </div>
              <div className="ticket-spec-item">
                <span className="spec-lbl">Machine:</span>
                <span className="spec-val">{job.machine}</span>
              </div>
              <div className="ticket-spec-item">
                <span className="spec-lbl">Stringer:</span>
                <span className="spec-val">{job.technician}</span>
              </div>
            </div>

            {job.notes && (
              <p className="ticket-notes">
                <strong>Notes:</strong> {job.notes}
              </p>
            )}

            {/* Status Transition Action Buttons */}
            <div className="ticket-actions-row">
              {job.status === 'received' && (
                <button 
                  className="btn btn-primary btn-sm btn-full"
                  onClick={() => onUpdateJobStatus(job.id, 'in_progress')}
                >
                  <Wrench size={14} />
                  <span>Mount on Machine &amp; String</span>
                </button>
              )}

              {job.status === 'in_progress' && (
                <button 
                  className="btn btn-dark btn-sm btn-full"
                  onClick={() => onUpdateJobStatus(job.id, 'qc_passed')}
                >
                  <CheckCircle size={14} />
                  <span>Mark Tension QC Passed</span>
                </button>
              )}

              {job.status === 'qc_passed' && (
                <button 
                  className="btn btn-outline btn-sm btn-full"
                  onClick={() => onUpdateJobStatus(job.id, 'dispatched')}
                >
                  <Truck size={14} />
                  <span>Dispatch to Customer / Court</span>
                </button>
              )}

              {job.status === 'dispatched' && (
                <div className="dispatched-complete-msg">
                  <CheckCircle size={14} className="text-green" />
                  <span>Completed &amp; Delivered</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal: New Walk-in Ticket */}
      {showAddTicket && (
        <div className="modal-overlay" onClick={() => setShowAddTicket(false)}>
          <div className="modal-container ticket-create-modal animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Create Restringing Job Ticket</h3>
              <button className="modal-close-btn" onClick={() => setShowAddTicket(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="admin-form-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Customer Name:</label>
                  <input 
                    type="text" 
                    required 
                    value={customerName} 
                    onChange={(e) => setCustomerName(e.target.value)} 
                    placeholder="e.g. Lin Dan"
                  />
                </div>
                <div className="form-group">
                  <label>Phone / WhatsApp:</label>
                  <input 
                    type="text" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="+855 ..."
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Badminton Racket Model:</label>
                <input 
                  type="text" 
                  required 
                  value={racket} 
                  onChange={(e) => setRacket(e.target.value)} 
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Selected String:</label>
                  <select value={stringName} onChange={(e) => setStringName(e.target.value)}>
                    <option value="Yonex BG80 (0.68mm)">Yonex BG80 (0.68mm)</option>
                    <option value="Yonex BG66 Ultimax (0.65mm)">Yonex BG66 Ultimax (0.65mm)</option>
                    <option value="Li-Ning LN65 (0.65mm)">Li-Ning LN65 (0.65mm)</option>
                    <option value="Yonex Aerobite Hybrid">Yonex Aerobite Hybrid</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Tension (lbs):</label>
                  <input 
                    type="number" 
                    min="20" 
                    max="32" 
                    value={tension} 
                    onChange={(e) => setTension(e.target.value)} 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Stringing Notes / Pattern:</label>
                <textarea 
                  rows="2"
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)} 
                  placeholder="e.g. 4-knot Haribito pattern, 10% pre-stretch"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowAddTicket(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create &amp; Print Ticket</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
