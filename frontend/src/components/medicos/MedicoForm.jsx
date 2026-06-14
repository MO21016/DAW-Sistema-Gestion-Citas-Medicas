import { useEffect, useState } from 'react';
import { medicoService } from '../../services/medicoService';

const initialState = {
  nombreMedico: '',
  apellidoMedico: '',
  telefonoMedico: '',
  correoMedico: ''
};

const MedicoForm = ({
  editingMedico,
  setEditingMedico,
  setMedicos,
  closeModal
}) => {
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingMedico) {
      setFormData(editingMedico);
    } else {
      setFormData(initialState);
    }
  }, [editingMedico]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData(initialState);
    setEditingMedico(null);
    closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingMedico) {
        const updated = await medicoService.update(
          editingMedico.idMedico,
          formData
        );
        setMedicos((prev) =>
          prev.map((med) =>
            med.idMedico === updated.idMedico ? updated : med
          )
        );
      } else {
        const created = await medicoService.create(formData);
        setMedicos((prev) => [...prev, created]);
      }
      resetForm();
    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nombres</label>
        <input
          type="text"
          name="nombreMedico"
          value={formData.nombreMedico}
          onChange={handleChange}
          placeholder="Ej: Juan Carlos"
          required
        />
      </div>

      <div className="form-group">
        <label>Apellidos</label>
        <input
          type="text"
          name="apellidoMedico"
          value={formData.apellidoMedico}
          onChange={handleChange}
          placeholder="Ej: Pérez"
          required
        />
      </div>

      <div className="form-group">
        <label>Teléfono</label>
        <input
          type="text"
          name="telefonoMedico"
          value={formData.telefonoMedico}
          onChange={handleChange}
          placeholder="Ej: 7777-8888"
          required
        />
      </div>

      <div className="form-group">
        <label>Correo Electrónico</label>
        <input
          type="email"
          name="correoMedico"
          value={formData.correoMedico}
          onChange={handleChange}
          placeholder="Ej: juan.perez@healify.com"
          required
        />
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={resetForm}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting}
        >
          {submitting
            ? 'Guardando...'
            : editingMedico ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  );
};

export default MedicoForm;
