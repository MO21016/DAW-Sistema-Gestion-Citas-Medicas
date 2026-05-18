import { useState } from 'react';
import EspecialidadRow from './EspecialidadRow';
import ConfirmModal from '../ui/ConfirmModal';
import { especialidadService } from '../../services/especialidadService';

const EspecialidadTable = ({ especialidades, setEspecialidades, onEdit }) => {
  const [especialidadToDelete, setEspecialidadToDelete] = useState(null);

  const handleDelete = async () => {
    try {
      await especialidadService.delete(especialidadToDelete.idEspecialidad);
      setEspecialidades((prev) =>
        prev.filter((esp) => esp.idEspecialidad !== especialidadToDelete.idEspecialidad)
      );
      setEspecialidadToDelete(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="card">
        <div className="list-header">
          <h2>Especialidades</h2>
          <span className="badge">{especialidades.length}</span>
        </div>

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Médicos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {especialidades.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <div className="empty-state">
                      <p>No hay especialidades registradas.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                especialidades.map((especialidad) => (
                  <EspecialidadRow
                    key={especialidad.idEspecialidad}
                    especialidad={especialidad}
                    onEdit={onEdit}
                    onDelete={() => setEspecialidadToDelete(especialidad)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {especialidadToDelete && (
        <ConfirmModal
          title="Eliminar Especialidad"
          message={`¿Deseas eliminar "${especialidadToDelete.nombreEspecialidad}"? Esta acción no se puede deshacer.`}
          onConfirm={handleDelete}
          onCancel={() => setEspecialidadToDelete(null)}
        />
      )}
    </>
  );
};

export default EspecialidadTable;