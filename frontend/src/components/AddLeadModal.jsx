import { useState } from 'react';

export default function AddLeadModal({ onAdd, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', source: 'Website' });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onAdd(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Add New Lead</h3>
        <form onSubmit={submit}>
          <input name="name" placeholder="Full Name" required onChange={handle} />
          <input name="email" type="email" placeholder="Email" required onChange={handle} />
          <input name="phone" placeholder="Phone (optional)" onChange={handle} />
          <select name="source" onChange={handle}>
            <option>Website</option>
            <option>Referral</option>
            <option>Social Media</option>
            <option>Cold Outreach</option>
            <option>Other</option>
          </select>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit">Add Lead</button>
          </div>
        </form>
      </div>
    </div>
  );
}
