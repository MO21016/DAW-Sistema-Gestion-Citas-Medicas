import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useMedicos } from '../hooks/useMedicos';
import MedicoForm from '../components/medicos/MedicoForm';
import MedicoTable from '../components/medicos/MedicoTable';
import Modal from '../components/ui/Modal';

const MedicosPage = () => {
  const { medicos, setMedicos, loading, error } = useMedicos();
  const [editingMedico, setEditingMedico] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleCreate = () => {
    setEditingMedico(null);
    setOpenModal(true);
  };

  const handleEdit = (medico) => {
    setEditingMedico(medico);
    setOpenModal(true);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Cargando médicos...</p>
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
          <h1 className="page-title">Médicos</h1>
          <p className="page-description">
            Administra el personal médico registrado en el sistema Healify.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleCreate}>
          <Plus size={18} />
          Nuevo Médico
        </button>
      </div>

      <MedicoTable
        medicos={medicos}
        setMedicos={setMedicos}
        onEdit={handleEdit}
      />

      {openModal && (
        <Modal
          title={editingMedico ? 'Editar Médico' : 'Nuevo Médico'}
          onClose={() => {
            setOpenModal(false);
            setEditingMedico(null);
          }}
        >
          <MedicoForm
            editingMedico={editingMedico}
            setEditingMedico={setEditingMedico}
            setMedicos={setMedicos}
            closeModal={() => setOpenModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default MedicosPage;
