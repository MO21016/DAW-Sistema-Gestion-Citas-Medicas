import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useCitas } from '../hooks/useCitas';
import CitaForm from '../components/citas/CitaForm';
import CitaTable from '../components/citas/CitaTable';
import CitaEstadoModal from '../components/citas/CitaEstadoModal';
import Modal from '../components/ui/Modal';

const CitasPage = () => {
  const { citas, setCitas, loading, error } = useCitas();
  const [editingCita, setEditingCita] = useState(null);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [estadoCita, setEstadoCita] = useState(null);

  const handleCreate = () => {
    setEditingCita(null);
    setOpenFormModal(true);
  };

  const handleEdit = (cita) => {
    setEditingCita(cita);
    setOpenFormModal(true);
  };

  const handleChangeEstado = (cita) => {
    setEstadoCita(cita);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Cargando citas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Citas Médicas</h1>
          <p className="page-description">
            Administra las citas médicas del sistema Healify. Crea, edita, cambia el estado o elimina citas.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleCreate}>
          <Plus size={18} />
          Nueva Cita
        </button>
      </div>

      <CitaTable
        citas={citas}
        setCitas={setCitas}
        onEdit={handleEdit}
        onChangeEstado={handleChangeEstado}
      />

      {/* Modal para crear/editar */}
      {openFormModal && (
        <Modal
          title={editingCita ? 'Editar Cita' : 'Nueva Cita'}
          onClose={() => {
            setOpenFormModal(false);
            setEditingCita(null);
          }}
        >
          <CitaForm
            editingCita={editingCita}
            setEditingCita={setEditingCita}
            setCitas={setCitas}
            closeModal={() => setOpenFormModal(false)}
          />
        </Modal>
      )}

      {/* Modal para cambiar estado */}
      {estadoCita && (
        <Modal
          title="Cambiar Estado de Cita"
          onClose={() => setEstadoCita(null)}
        >
          <CitaEstadoModal
            cita={estadoCita}
            setCitas={setCitas}
            closeModal={() => setEstadoCita(null)}
          />
        </Modal>
      )}
    </div>
  );
};

export default CitasPage;
