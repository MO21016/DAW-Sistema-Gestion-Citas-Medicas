const DashboardStats = ({ stats }) => {

  const cards = [
    {
      title: 'Especialidades',
      value: stats.especialidades ?? 0,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4" />
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
      ),
    },
    {
      title: 'Médicos',
      value: stats.medicos ?? 0,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="7" r="4" />
          <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
          <path d="M19 8v4" />
          <path d="M17 10h4" />
        </svg>
      ),
    },
    {
      title: 'Pacientes',
      value: stats.pacientes ?? 0,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      title: 'Citas Hoy',
      value: stats.citasHoy ?? 0,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
  ];

  return (
    <section className="stats-grid">
      {cards.map((card, index) => (
        <article className="dashboard-card" key={index}>
          <div className="dashboard-card-icon">{card.icon}</div>
          <div>
            <h3>{card.title}</h3>
            <p>{card.value}</p>
          </div>
        </article>
      ))}
    </section>
  );
};

export default DashboardStats;