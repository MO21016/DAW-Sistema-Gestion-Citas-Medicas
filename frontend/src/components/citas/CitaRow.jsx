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

const CitaRow = ({ cita, onEdit, onChangeEstado, onDelete }) => {

  const puedeEditar =
    cita.estadoCita === 'PENDIENTE' || cita.estadoCita === 'CONFIRMADA';

  const puedeEliminar =
    cita.estadoCita === 'PENDIENTE' || cita.estadoCita === 'CANCELADA';

  const puedeCambiarEstado =
    cita.estadoCita === 'PENDIENTE' || cita.estadoCita === 'CONFIRMADA';

  return (
    <tr>
      <td>{cita.idCita}</td>
      <td>{cita.paciente?.nombreCompleto ?? '—'}</td>
      <td>{cita.medico?.nombreCompleto ?? '—'}</td>
      <td>{cita.especialidad?.nombreEspecialidad ?? '—'}</td>
      <td>{formatFecha(cita.fechaCita)}</td>
      <td>{cita.horaCita?.slice(0, 5) ?? '—'}</td>
      <td>
        <span className={`status ${cita.estadoCita.toLowerCase()}`}>
          {ESTADO_LABELS[cita.estadoCita] ?? cita.estadoCita}
        </span>
      </td>
      <td>
        <div className="actions-wrapper">
          {puedeEditar && (
            <button
              className="btn btn-sm btn-edit"
              onClick={() => onEdit(cita)}
            >
              Editar
            </button>
          )}
          {puedeCambiarEstado && (
            <button
              className="btn btn-sm btn-estado"
              onClick={() => onChangeEstado(cita)}
            >
              Estado
            </button>
          )}
          {puedeEliminar && (
            <button
              className="btn btn-sm btn-danger"
              onClick={() => onDelete(cita)}
            >
              Eliminar
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default CitaRow;
