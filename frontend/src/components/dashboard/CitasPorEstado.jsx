const ESTADOS = [
  {
    key: 'PENDIENTE',
    label: 'Pendientes',
    colorClass: 'estado-pendiente',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    key: 'CONFIRMADA',
    label: 'Confirmadas',
    colorClass: 'estado-confirmada',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    key: 'COMPLETADA',
    label: 'Completadas',
    colorClass: 'estado-completada',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    key: 'CANCELADA',
    label: 'Canceladas',
    colorClass: 'estado-cancelada',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
  },
];

const CitasPorEstado = ({ citasEstado }) => {
  return (
    <section className="citas-estado-section">
      <h2 className="section-title">Citas por Estado</h2>
      <div className="citas-estado-grid">
        {ESTADOS.map(({ key, label, colorClass, icon }) => (
          <div key={key} className={`estado-card ${colorClass}`}>
            <div className="estado-card-icon">{icon}</div>
            <div className="estado-card-info">
              <span className="estado-card-label">{label}</span>
              <span className="estado-card-value">
                {citasEstado[key] ?? 0}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CitasPorEstado;