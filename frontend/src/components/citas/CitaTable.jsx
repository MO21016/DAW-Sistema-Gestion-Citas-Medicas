import { useState } from 'react';
import CitaRow from './CitaRow';
import ConfirmModal from '../ui/ConfirmModal';
import { citaService } from '../../services/citaService';

const FILTROS_ESTADO = [
  { key: 'TODAS', label: 'Todas' },
  { key: 'PENDIENTE', label: 'Pendientes' },
  { key: 'CONFIRMADA', label: 'Confirmadas' },
  { key: 'COMPLETADA', label: 'Completadas' },
  { key: 'CANCELADA', label: 'Canceladas' },
];

const CitaTable = ({ citas, setCitas, onEdit, onChangeEstado }) => {
  const [citaToDelete, setCitaToDelete] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState('TODAS');

  const citasFiltradas =
    filtroEstado === 'TODAS'
      ? citas
      : citas.filter((c) => c.estadoCita === filtroEstado);

  const handleDelete = async () => {
    try {
      await citaService.delete(citaToDelete.idCita);
      setCitas((prev) =>
        prev.filter((c) => c.idCita !== citaToDelete.idCita)
      );
      setCitaToDelete(null);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="card">
        <div className="list-header">
          <h2>Citas Médicas</h2>
          <span className="badge">{citasFiltradas.length}</span>
        </div>

        {/* Filtros por estado */}
        <div className="filtros-estado">
          {FILTROS_ESTADO.map(({ key, label }) => (
            <button
              key={key}
              className={`filtro-pill ${filtroEstado === key ? 'active' : ''}`}
              onClick={() => setFiltroEstado(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Paciente</th>
                <th>Médico</th>
                <th>Especialidad</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {citasFiltradas.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <div className="empty-state">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <p>No hay citas registradas.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                citasFiltradas.map((cita) => (
                  <CitaRow
                    key={cita.idCita}
                    cita={cita}
                    onEdit={onEdit}
                    onChangeEstado={onChangeEstado}
                    onDelete={() => setCitaToDelete(cita)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {citaToDelete && (
        <ConfirmModal
          title="Eliminar Cita"
          message={`¿Deseas eliminar la cita #${citaToDelete.idCita} del paciente "${citaToDelete.paciente?.nombreCompleto}"? Esta acción no se puede deshacer.`}
          onConfirm={handleDelete}
          onCancel={() => setCitaToDelete(null)}
        />
      )}
    </>
  );
};

export default CitaTable;
