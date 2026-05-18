import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useEspecialidades } from '../hooks/useEspecialidades';
import EspecialidadForm from '../components/especialidades/EspecialidadForm';
import EspecialidadTable from '../components/especialidades/EspecialidadTable';
import Modal from '../components/ui/Modal';

const EspecialidadesPage = () => {
  const { especialidades, setEspecialidades, loading, error } = useEspecialidades();
  const [editingEspecialidad, setEditingEspecialidad] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleCreate = () => {
    setEditingEspecialidad(null);
    setOpenModal(true);
  };

  const handleEdit = (especialidad) => {
    setEditingEspecialidad(especialidad);
    setOpenModal(true);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Cargando especialidades...</p>
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
          <h1 className="page-title">Especialidades Médicas</h1>
          <p className="page-description">
            Administra las especialidades médicas disponibles dentro del sistema Healify.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleCreate}>
          <Plus size={18} />
          Nueva Especialidad
        </button>
      </div>

      <EspecialidadTable
        especialidades={especialidades}
        setEspecialidades={setEspecialidades}
        onEdit={handleEdit}
      />

      {openModal && (
        <Modal
          title={editingEspecialidad ? 'Editar Especialidad' : 'Nueva Especialidad'}
          onClose={() => {
            setOpenModal(false);
            setEditingEspecialidad(null);
          }}
        >
          <EspecialidadForm
            editingEspecialidad={editingEspecialidad}
            setEditingEspecialidad={setEditingEspecialidad}
            setEspecialidades={setEspecialidades}
            closeModal={() => setOpenModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default EspecialidadesPage;