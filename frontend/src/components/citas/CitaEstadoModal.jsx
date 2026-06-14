import { citaService } from '../../services/citaService';

const TRANSICIONES = {
  PENDIENTE: [
    { estado: 'CONFIRMADA', label: 'Confirmar', className: 'btn-confirmar' },
    { estado: 'CANCELADA', label: 'Cancelar', className: 'btn-cancelar' },
  ],
  CONFIRMADA: [
    { estado: 'COMPLETADA', label: 'Completar', className: 'btn-completar' },
    { estado: 'CANCELADA', label: 'Cancelar', className: 'btn-cancelar' },
  ],
  COMPLETADA: [],
  CANCELADA: [],
};

const ESTADO_LABELS = {
  PENDIENTE: 'Pendiente',
  CONFIRMADA: 'Confirmada',
  COMPLETADA: 'Completada',
  CANCELADA: 'Cancelada',
};

const CitaEstadoModal = ({ cita, setCitas, closeModal }) => {

  const transiciones = TRANSICIONES[cita.estadoCita] || [];

  const handleCambiarEstado = async (nuevoEstado) => {
    try {
      const citaActualizada = await citaService.cambiarEstado(
        cita.idCita,
        nuevoEstado
      );
      setCitas((prev) =>
        prev.map((c) =>
          c.idCita === citaActualizada.idCita ? citaActualizada : c
        )
      );
      closeModal();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="estado-modal-content">
      <div className="estado-actual">
        <span className="estado-label">Estado actual:</span>
        <span className={`status ${cita.estadoCita.toLowerCase()}`}>
          {ESTADO_LABELS[cita.estadoCita]}
        </span>
      </div>

      <div className="estado-info">
        <p>
          <strong>Cita #{cita.idCita}</strong> — {cita.paciente?.nombreCompleto}
        </p>
        <p className="estado-info-sub">
          {cita.medico?.nombreCompleto} · {cita.especialidad?.nombreEspecialidad}
        </p>
      </div>

      {transiciones.length > 0 ? (
        <>
          <p className="estado-instruccion">Selecciona el nuevo estado:</p>
          <div className="estado-acciones">
            {transiciones.map(({ estado, label, className }) => (
              <button
                key={estado}
                className={`btn ${className}`}
                onClick={() => handleCambiarEstado(estado)}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="estado-bloqueado">
          <p>
            Esta cita ya está <strong>{ESTADO_LABELS[cita.estadoCita].toLowerCase()}</strong> y no se puede cambiar su estado.
          </p>
        </div>
      )}

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={closeModal}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default CitaEstadoModal;
