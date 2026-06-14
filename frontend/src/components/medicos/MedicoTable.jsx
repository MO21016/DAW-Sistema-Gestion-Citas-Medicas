import { useState } from 'react';
import MedicoRow from './MedicoRow';
import ConfirmModal from '../ui/ConfirmModal';
import { medicoService } from '../../services/medicoService';

const MedicoTable = ({ medicos, setMedicos, onEdit }) => {
  const [medicoToDelete, setMedicoToDelete] = useState(null);

  const handleDelete = async () => {
    try {
      await medicoService.delete(medicoToDelete.idMedico);
      setMedicos((prev) =>
        prev.filter((med) => med.idMedico !== medicoToDelete.idMedico)
      );
      setMedicoToDelete(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="card">
        <div className="list-header">
          <h2>Médicos</h2>
          <span className="badge">{medicos.length}</span>
        </div>

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {medicos.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div className="empty-state">
                      <p>No hay médicos registrados.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                medicos.map((medico) => (
                  <MedicoRow
                    key={medico.idMedico}
                    medico={medico}
                    onEdit={onEdit}
                    onDelete={() => setMedicoToDelete(medico)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {medicoToDelete && (
        <ConfirmModal
          title="Eliminar Médico"
          message={`¿Deseas eliminar al Dr. ${medicoToDelete.nombreMedico} ${medicoToDelete.apellidoMedico}? Esta acción no se puede deshacer.`}
          onConfirm={handleDelete}
          onCancel={() => setMedicoToDelete(null)}
        />
      )}
    </>
  );
};

export default MedicoTable;
