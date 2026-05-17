const ESTADO_LABELS = {
  PENDIENTE: 'Pendiente',
  CONFIRMADA: 'Confirmada',
  COMPLETADA: 'Completada',
  CANCELADA: 'Cancelada',
};

const formatFecha = (fecha) => {
  if (!fecha) return '—';
  const [year, month, day] = fecha.split('-');
  return `${day}/${month}/${year}`;
};

const EmptyState = () => (
  <div className="empty-state">
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
    <p>No hay próximas citas programadas</p>
  </div>
);

const RecentAppointments = ({ appointments }) => {

  const today = new Date().toISOString().split('T')[0];

  // Solo citas futuras o de hoy con estado activo, ordenadas por fecha y hora
  const proximas = appointments
    .filter(
      (a) =>
        a.fechaCita >= today &&
        (a.estadoCita === 'PENDIENTE' || a.estadoCita === 'CONFIRMADA')
    )
    .sort((a, b) => {
      if (a.fechaCita !== b.fechaCita) return a.fechaCita.localeCompare(b.fechaCita);
      return a.horaCita.localeCompare(b.horaCita);
    })
    .slice(0, 8);

  return (
    <section className="card">
      <div className="list-header">
        <h2>Próximas Citas</h2>
        <span className="badge">{proximas.length}</span>
      </div>

      {proximas.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Médico</th>
                <th>Especialidad</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {proximas.map((appointment) => (
                <tr key={appointment.idCita}>
                  <td>{appointment.paciente?.nombreCompleto ?? '—'}</td>
                  <td>{appointment.medico?.nombreCompleto ?? '—'}</td>
                  <td>{appointment.especialidad?.nombreEspecialidad ?? '—'}</td>
                  <td>{formatFecha(appointment.fechaCita)}</td>
                  <td>{appointment.horaCita?.slice(0, 5) ?? '—'}</td>
                  <td>
                    <span className={`status ${appointment.estadoCita.toLowerCase()}`}>
                      {ESTADO_LABELS[appointment.estadoCita] ?? appointment.estadoCita}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default RecentAppointments;