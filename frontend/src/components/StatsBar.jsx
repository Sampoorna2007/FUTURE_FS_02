export default function StatsBar({ stats }) {
  const cards = [
    { label: 'Total Leads', value: stats.total, color: '#6366f1' },
    { label: 'New', value: stats.new, color: '#f59e0b' },
    { label: 'Contacted', value: stats.contacted, color: '#3b82f6' },
    { label: 'Converted', value: stats.converted, color: '#10b981' },
  ];

  return (
    <div className="stats-bar">
      {cards.map((c) => (
        <div className="stat-card" key={c.label} style={{ borderTop: `4px solid ${c.color}` }}>
          <span className="stat-value" style={{ color: c.color }}>{c.value}</span>
          <span className="stat-label">{c.label}</span>
        </div>
      ))}
    </div>
  );
}
