import { useEffect, useState } from 'react';
import { citaService } from '../../services/citaService';

const BASE_URL = import.meta.env.VITE_API_URL;

const HORARIOS = [
  '08:00', '09:00', '10:00', '11:00',
  '13:00', '14:00', '15:00', '16:00',
];

const initialState = {
  idPaciente: '',
  idMedico: '',
  idEspecialidad: '',
  fechaCita: '',
  horaCita: '',
  motivoCita: '',
};

const CitaForm = ({
  editingCita,
  setEditingCita,
  setCitas,
  closeModal
}) => {
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  // Listas para los selects
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [loadingSelects, setLoadingSelects] = useState(true);

  // Cargar listas de pacientes, médicos y especialidades
  useEffect(() => {
    const loadSelects = async () => {
      try {
        const [pacs, meds, esps] = await Promise.all([
          fetch(`${BASE_URL}/pacientes`).then((r) => r.json()),
          fetch(`${BASE_URL}/medicos`).then((r) => r.json()),
          fetch(`${BASE_URL}/especialidades`).then((r) => r.json()),
        ]);
        setPacientes(pacs);
        setMedicos(meds);
        setEspecialidades(esps);
      } catch (err) {
        console.error('Error cargando datos para el formulario:', err);
      } finally {
        setLoadingSelects(false);
      }
    };

    loadSelects();
  }, []);

  // Si se está editando, cargar datos en el form
  useEffect(() => {
    if (editingCita) {
      setFormData({
        idPaciente: editingCita.paciente?.idPaciente ?? '',
        idMedico: editingCita.medico?.idMedico ?? '',
        idEspecialidad: editingCita.especialidad?.idEspecialidad ?? '',
        fechaCita: editingCita.fechaCita ?? '',
        horaCita: editingCita.horaCita?.slice(0, 5) ?? '',
        motivoCita: editingCita.motivoCita ?? '',
      });
    } else {
      setFormData(initialState);
    }
  }, [editingCita]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'idMedico') {
      // Al cambiar médico, resetear especialidad porque puede no ser válida
      setFormData({ ...formData, idMedico: value, idEspecialidad: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Filtrar especialidades según el médico seleccionado
  const medicoSeleccionado = medicos.find(
    (m) => String(m.idMedico) === String(formData.idMedico)
  );

  const especialidadesFiltradas = medicoSeleccionado
    ? especialidades.filter((e) =>
        medicoSeleccionado.especialidades?.includes(e.nombreEspecialidad)
      )
    : [];

  const resetForm = () => {
    setFormData(initialState);
    setEditingCita(null);
    closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingCita) {
        // Solo se envían fecha, hora y motivo al editar
        const updateData = {
          fechaCita: formData.fechaCita,
          horaCita: formData.horaCita + ':00',
          motivoCita: formData.motivoCita,
        };
        const updated = await citaService.update(
          editingCita.idCita,
          updateData
        );
        setCitas((prev) =>
          prev.map((c) =>
            c.idCita === updated.idCita ? updated : c
          )
        );
      } else {
        // Crear cita nueva
        const createData = {
          idPaciente: Number(formData.idPaciente),
          idMedico: Number(formData.idMedico),
          idEspecialidad: Number(formData.idEspecialidad),
          fechaCita: formData.fechaCita,
          horaCita: formData.horaCita + ':00',
          motivoCita: formData.motivoCita,
        };
        const created = await citaService.create(createData);
        setCitas((prev) => [...prev, created]);
      }
      resetForm();
    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingSelects) {
    return (
      <div className="loading-selects">
        <div className="spinner" style={{ width: 32, height: 32 }} />
        <p>Cargando datos...</p>
      </div>
    );
  }

  const isEditing = !!editingCita;

  return (
    <form onSubmit={handleSubmit}>
      {/* Paciente - solo al crear */}
      {!isEditing && (
        <div className="form-group">
          <label>Paciente</label>
          <select
            name="idPaciente"
            value={formData.idPaciente}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar paciente...</option>
            {pacientes.map((p) => (
              <option key={p.idPaciente} value={p.idPaciente}>
                {p.nombrePaciente} {p.apellidoPaciente}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Médico - solo al crear */}
      {!isEditing && (
        <div className="form-group">
          <label>Médico</label>
          <select
            name="idMedico"
            value={formData.idMedico}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar médico...</option>
            {medicos.map((m) => (
              <option key={m.idMedico} value={m.idMedico}>
                Dr. {m.nombreMedico} {m.apellidoMedico}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Especialidad - solo al crear, filtrada por médico */}
      {!isEditing && (
        <div className="form-group">
          <label>Especialidad</label>
          <select
            name="idEspecialidad"
            value={formData.idEspecialidad}
            onChange={handleChange}
            required
            disabled={!formData.idMedico}
          >
            <option value="">
              {!formData.idMedico
                ? 'Primero selecciona un médico...'
                : especialidadesFiltradas.length === 0
                  ? 'Este médico no tiene especialidades asignadas'
                  : 'Seleccionar especialidad...'}
            </option>
            {especialidadesFiltradas.map((e) => (
              <option key={e.idEspecialidad} value={e.idEspecialidad}>
                {e.nombreEspecialidad}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Info de la cita al editar */}
      {isEditing && (
        <div className="cita-edit-info">
          <p><strong>Paciente:</strong> {editingCita.paciente?.nombreCompleto}</p>
          <p><strong>Médico:</strong> {editingCita.medico?.nombreCompleto}</p>
          <p><strong>Especialidad:</strong> {editingCita.especialidad?.nombreEspecialidad}</p>
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label>Fecha</label>
          <input
            type="date"
            name="fechaCita"
            value={formData.fechaCita}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Hora</label>
          <select
            name="horaCita"
            value={formData.horaCita}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar hora...</option>
            {HORARIOS.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Motivo de la cita</label>
        <textarea
          name="motivoCita"
          value={formData.motivoCita}
          onChange={handleChange}
          placeholder="Describe el motivo de la consulta..."
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
            : isEditing ? 'Actualizar' : 'Crear Cita'}
        </button>
      </div>
    </form>
  );
};

export default CitaForm;
