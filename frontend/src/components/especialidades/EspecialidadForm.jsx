import { useEffect, useState } from 'react';
import { especialidadService } from '../../services/especialidadService';

const initialState = {
  nombreEspecialidad: '',
  descripcion: ''
};

const EspecialidadForm = ({
  editingEspecialidad,
  setEditingEspecialidad,
  setEspecialidades,
  closeModal
}) => {
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingEspecialidad) {
      setFormData(editingEspecialidad);
    } else {
      setFormData(initialState);
    }
  }, [editingEspecialidad]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData(initialState);
    setEditingEspecialidad(null);
    closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingEspecialidad) {
        const updated = await especialidadService.update(
          editingEspecialidad.idEspecialidad,
          formData
        );
        setEspecialidades((prev) =>
          prev.map((esp) =>
            esp.idEspecialidad === updated.idEspecialidad ? updated : esp
          )
        );
      } else {
        const created = await especialidadService.create(formData);
        setEspecialidades((prev) => [...prev, created]);
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
        <label>Nombre</label>
        <input
          type="text"
          name="nombreEspecialidad"
          value={formData.nombreEspecialidad}
          onChange={handleChange}
          placeholder="Ej: Cardiología"
          required
        />
      </div>

      <div className="form-group">
        <label>Descripción</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Descripción breve de la especialidad..."
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
            : editingEspecialidad ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  );
};

export default EspecialidadForm;