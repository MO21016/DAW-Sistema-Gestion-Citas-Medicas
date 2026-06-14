import { useEffect, useState } from 'react';
import { pacienteService } from '../../services/pacienteService';

const initialState = {
  nombrePaciente: '',
  apellidoPaciente: '',
  fechaNacimiento: '',
  telefonoPaciente: '',
  correoPaciente: ''
};

const PacienteForm = ({
  editingPaciente,
  setEditingPaciente,
  setPacientes,
  closeModal
}) => {
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingPaciente) {
      setFormData({
        nombrePaciente: editingPaciente.nombrePaciente || '',
        apellidoPaciente: editingPaciente.apellidoPaciente || '',
        fechaNacimiento: editingPaciente.fechaNacimiento || '',
        telefonoPaciente: editingPaciente.telefonoPaciente || '',
        correoPaciente: editingPaciente.correoPaciente || ''
      });
    } else {
      setFormData(initialState);
    }
  }, [editingPaciente]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData(initialState);
    setEditingPaciente(null);
    closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {

      if (editingPaciente) {

        const updated = await pacienteService.update(
          editingPaciente.idPaciente,
          formData
        );

        setPacientes((prev) =>
          prev.map((paciente) =>
            paciente.idPaciente === updated.idPaciente
              ? updated
              : paciente
          )
        );

      } else {

        const created = await pacienteService.create(formData);

        setPacientes((prev) => [...prev, created]);

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
          name="nombrePaciente"
          value={formData.nombrePaciente}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Apellido</label>
        <input
          type="text"
          name="apellidoPaciente"
          value={formData.apellidoPaciente}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Fecha de Nacimiento</label>
        <input
          type="date"
          name="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Teléfono</label>
        <input
          type="text"
          name="telefonoPaciente"
          value={formData.telefonoPaciente}
          onChange={handleChange}
          maxLength={8}
          required
        />
      </div>

      <div className="form-group">
        <label>Correo</label>
        <input
          type="email"
          name="correoPaciente"
          value={formData.correoPaciente}
          onChange={handleChange}
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
            : editingPaciente
              ? 'Actualizar'
              : 'Crear'}
        </button>
      </div>

    </form>
  );
};

export default PacienteForm;