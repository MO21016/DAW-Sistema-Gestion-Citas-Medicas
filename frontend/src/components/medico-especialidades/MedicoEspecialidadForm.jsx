import { useEffect, useState } from 'react';
import { medicoEspecialidadService } from '../../services/medicoEspecialidadService';
import { especialidadService } from '../../services/especialidadService';

const MedicoEspecialidadForm = ({ medico, onSuccess }) => {
    const [todasEspecialidades, setTodasEspecialidades] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [loadingOptions, setLoadingOptions] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await especialidadService.getAll();
                setTodasEspecialidades(data);
            } catch (error) {
                alert('Error al cargar especialidades: ' + error.message);
            } finally {
                setLoadingOptions(false);
            }
        };
        load();
    }, []);

    // Especialidades the medico doesn't have yet (filter by name match)
    const disponibles = todasEspecialidades.filter(
        (esp) => !medico.especialidades.includes(esp.nombreEspecialidad)
    );

    const handleAsignar = async (e) => {
        e.preventDefault();
        if (!selectedId) return;
        setSubmitting(true);
        try {
            await medicoEspecialidadService.asignar({
                idMedico: medico.idMedico,
                idEspecialidad: Number(selectedId)
            });
            setSelectedId('');
            onSuccess?.();
        } catch (error) {
            alert(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDesasignar = async (nombreEspecialidad) => {
        const esp = todasEspecialidades.find(
            (e) => e.nombreEspecialidad === nombreEspecialidad
        );
        if (!esp) return alert('No se encontró el ID de la especialidad.');
        try {
            await medicoEspecialidadService.desasignar(medico.idMedico, esp.idEspecialidad);
            onSuccess?.();
        } catch (error) {
            alert(error.message);
        }
    };

    if (loadingOptions) return <p>Cargando especialidades...</p>;

    return (
        <div>
            <p style={{ marginBottom: '12px' }}>
                <strong>{medico.nombreMedico} {medico.apellidoMedico}</strong>
            </p>

            {/* Current specialties with unassign */}
            <div className="form-group">
                <label>Especialidades asignadas</label>
                {medico.especialidades.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)' }}>Sin especialidades asignadas.</p>
                ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                        {medico.especialidades.map((nombre, i) => (
                            <div
                                key={i}
                                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                            >
                                <span className="badge">{nombre}</span>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDesasignar(nombre)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Assign new specialty */}
            <form onSubmit={handleAsignar} style={{ marginTop: '20px' }}>
                <div className="form-group">
                    <label>Asignar nueva especialidad</label>
                    <select
                        value={selectedId}
                        onChange={(e) => setSelectedId(e.target.value)}
                        required
                    >
                        <option value="">Selecciona una especialidad</option>
                        {disponibles.map((esp) => (
                            <option key={esp.idEspecialidad} value={esp.idEspecialidad}>
                                {esp.nombreEspecialidad}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-actions">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={submitting || !selectedId}
                    >
                        {submitting ? 'Asignando...' : 'Asignar'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MedicoEspecialidadForm;