import { useState } from 'react';

const STATUS_COLORS = { new: '#f59e0b', contacted: '#3b82f6', converted: '#10b981' };

export default function LeadRow({ lead, onStatusChange, onAddNote, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [note, setNote] = useState('');

  const submitNote = (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    onAddNote(lead._id, note);
    setNote('');
  };

  return (
    <>
      <tr>
        <td>{lead.name}</td>
        <td>{lead.email}</td>
        <td>{lead.phone || '—'}</td>
        <td><span className="badge" style={{ background: '#e0e7ff', color: '#4338ca' }}>{lead.source}</span></td>
        <td>
          <select
            value={lead.status}
            style={{ color: STATUS_COLORS[lead.status] }}
            onChange={(e) => onStatusChange(lead._id, e.target.value)}
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
          </select>
        </td>
        <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
        <td>
          <button className="btn-icon" onClick={() => setExpanded(!expanded)} title="Notes">
            💬 {lead.notes.length}
          </button>
          <button className="btn-icon danger" onClick={() => onDelete(lead._id)} title="Delete">🗑</button>
        </td>
      </tr>
      {expanded && (
        <tr className="notes-row">
          <td colSpan={7}>
            <div className="notes-panel">
              <div className="notes-list">
                {lead.notes.length === 0 && <p className="no-notes">No notes yet.</p>}
                {lead.notes.map((n, i) => (
                  <div key={i} className="note-item">
                    <span>{n.text}</span>
                    <small>{new Date(n.createdAt).toLocaleString()}</small>
                  </div>
                ))}
              </div>
              <form className="note-form" onSubmit={submitNote}>
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a follow-up note..."
                />
                <button type="submit">Add</button>
              </form>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
