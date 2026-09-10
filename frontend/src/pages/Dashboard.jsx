import { useEffect, useState } from 'react';
import api from '../api/axios';
import StatsBar from '../components/StatsBar';
import LeadRow from '../components/LeadRow';
import AddLeadModal from '../components/AddLeadModal';

export default function Dashboard({ onLogout }) {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, converted: 0 });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const fetchLeads = async () => {
    const params = {};
    if (search) params.search = search;
    if (statusFilter) params.status = statusFilter;
    const { data } = await api.get('/leads', { params });
    setLeads(data);
  };

  const fetchStats = async () => {
    const { data } = await api.get('/leads/stats');
    setStats(data);
  };

  useEffect(() => {
    fetchLeads();
    fetchStats();
  }, [search, statusFilter]);

  const addLead = async (form) => {
    await api.post('/leads', form);
    setShowModal(false);
    fetchLeads();
    fetchStats();
  };

  const updateStatus = async (id, status) => {
    await api.put(`/leads/${id}`, { status });
    fetchLeads();
    fetchStats();
  };

  const addNote = async (id, text) => {
    const { data } = await api.post(`/leads/${id}/notes`, { text });
    setLeads((prev) => prev.map((l) => (l._id === id ? data : l)));
  };

  const deleteLead = async (id) => {
    if (!confirm('Delete this lead?')) return;
    await api.delete(`/leads/${id}`);
    fetchLeads();
    fetchStats();
  };

  return (
    <div className="dashboard">
      <header className="topbar">
        <h1>🗂 Mini CRM</h1>
        <div className="topbar-right">
          <span>👤 {user.name}</span>
          <button className="btn-secondary" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <main className="main-content">
        <StatsBar stats={stats} />

        <div className="toolbar">
          <input
            placeholder="🔍 Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
          </select>
          <button onClick={() => setShowModal(true)}>+ Add Lead</button>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Source</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr><td colSpan={7} className="empty">No leads found.</td></tr>
              ) : (
                leads.map((lead) => (
                  <LeadRow
                    key={lead._id}
                    lead={lead}
                    onStatusChange={updateStatus}
                    onAddNote={addNote}
                    onDelete={deleteLead}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {showModal && <AddLeadModal onAdd={addLead} onClose={() => setShowModal(false)} />}
    </div>
  );
}
