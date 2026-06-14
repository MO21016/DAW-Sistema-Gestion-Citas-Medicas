import { useState } from 'react';
import { Plus } from 'lucide-react';

import { usePacientes } from '../hooks/usePacientes';

import PacienteForm from '../components/pacientes/PacienteForm';
import PacienteTable from '../components/pacientes/PacienteTable';

import Modal from '../components/ui/Modal';

const PacientesPage = () => {

  const {
    pacientes,
    setPacientes,
    loading,
    error
  } = usePacientes();

  const [editingPaciente, setEditingPaciente] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const handleCreate = () => {

    setEditingPaciente(null);

    setOpenModal(true);

  };

  const handleEdit = (paciente) => {

    setEditingPaciente(paciente);

    setOpenModal(true);

  };

  if (loading) {

    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Cargando pacientes...</p>
      </div>
    );

  }

  if (error) {

    return (
      <div className="error-screen">
        <p>{error}</p>
      </div>
    );

  }

  return (
    <div className="page-container">

      <div className="page-header">

        <div>

          <h1 className="page-title">
            Pacientes
          </h1>

          <p className="page-description">
            Administra los pacientes registrados dentro del sistema Healify.
          </p>

        </div>

        <button
          className="btn btn-primary"
          onClick={handleCreate}
        >
          <Plus size={18} />
          Nuevo Paciente
        </button>

      </div>

      <PacienteTable
        pacientes={pacientes}
        setPacientes={setPacientes}
        onEdit={handleEdit}
      />

      {openModal && (

        <Modal
          title={
            editingPaciente
              ? 'Editar Paciente'
              : 'Nuevo Paciente'
          }
          onClose={() => {

            setOpenModal(false);

            setEditingPaciente(null);

          }}
        >

          <PacienteForm
            editingPaciente={editingPaciente}
            setEditingPaciente={setEditingPaciente}
            setPacientes={setPacientes}
            closeModal={() => setOpenModal(false)}
          />

        </Modal>

      )}

    </div>
  );

};

export default PacientesPage;