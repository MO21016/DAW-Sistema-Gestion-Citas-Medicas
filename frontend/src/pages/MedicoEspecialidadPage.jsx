import { useEffect, useState } from 'react';
import { medicoService } from '../services/medicoService';
import MedicoEspecialidadTable from '../components/medico-especialidades/MedicoEspecialidadTable';
import MedicoEspecialidadForm from '../components/medico-especialidades/MedicoEspecialidadForm';
import Modal from '../components/ui/Modal';

const MedicoEspecialidadPage = () => {
    const [medicos, setMedicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMedico, setSelectedMedico] = useState(null);

    const loadMedicos = async () => {
        try {
            setLoading(true);
            const data = await medicoService.getAll();
            setMedicos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMedicos();
    }, []);

    // After assign/unassign: reload list and refresh selectedMedico from fresh data
    const handleSuccess = async () => {
        await loadMedicos();
        if (selectedMedico) {
            const fresh = await medicoService.getById(selectedMedico.idMedico);
            setSelectedMedico(fresh);
        }
    };

    if (loading) return (
        <div className="loading-screen">
            <div className="spinner" />
            <p>Cargando médicos...</p>
        </div>
    );

    if (error) return (
        <div className="error-screen"><p>{error}</p></div>
    );

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Asignación de Especialidades</h1>
                    <p className="page-description">
                        Administra las especialidades asignadas a cada médico dentro del sistema Healify.
                    </p>
                </div>
            </div>

            <MedicoEspecialidadTable
                medicos={medicos}
                onGestionar={setSelectedMedico}
            />

            {selectedMedico && (
                <Modal
                    title="Gestionar Especialidades"
                    onClose={() => setSelectedMedico(null)}
                >
                    <MedicoEspecialidadForm
                        medico={selectedMedico}
                        onSuccess={handleSuccess}
                    />
                </Modal>
            )}
        </div>
    );
};

export default MedicoEspecialidadPage;