import { useState } from 'react';
import PacienteRow from './PacienteRow';
import ConfirmModal from '../ui/ConfirmModal';
import { pacienteService } from '../../services/pacienteService';

const PacienteTable = ({
  pacientes,
  setPacientes,
  onEdit
}) => {

  const [pacienteToDelete, setPacienteToDelete] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDelete = async () => {

    try {

      setErrorMessage('');

      await pacienteService.delete(
        pacienteToDelete.idPaciente
      );

      setPacientes((prev) =>
        prev.filter(
          (paciente) =>
            paciente.idPaciente !== pacienteToDelete.idPaciente
        )
      );

      setPacienteToDelete(null);

    } catch (error) {

      console.error(error);

      setErrorMessage(error.message);

      // Opcional: cerrar el modal cuando ocurre el error
      setPacienteToDelete(null);

    }
  };

  return (
    <>
      <div className="card">

        <div className="list-header">
          <h2>Pacientes</h2>
          <span className="badge">
            {pacientes.length}
          </span>
        </div>

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        <div className="table-responsive">

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Edad</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Citas</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>

              {pacientes.length === 0 ? (

                <tr>
                  <td colSpan={8}>
                    <div className="empty-state">
                      <p>No hay pacientes registrados.</p>
                    </div>
                  </td>
                </tr>

              ) : (

                pacientes.map((paciente) => (
                  <PacienteRow
                    key={paciente.idPaciente}
                    paciente={paciente}
                    onEdit={onEdit}
                    onDelete={() => {
                      setErrorMessage('');
                      setPacienteToDelete(paciente);
                    }}
                  />
                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {pacienteToDelete && (
        <ConfirmModal
          title="Eliminar Paciente"
          message={`¿Deseas eliminar a ${pacienteToDelete.nombrePaciente} ${pacienteToDelete.apellidoPaciente}?`}
          onConfirm={handleDelete}
          onCancel={() => setPacienteToDelete(null)}
        />
      )}
    </>
  );
};

export default PacienteTable;