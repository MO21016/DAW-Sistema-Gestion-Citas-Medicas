import { useState } from 'react';
import { medicoEspecialidadService } from '../services/medicoEspecialidadService';

export const useMedicoEspecialidad = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const asignar = async (idMedico, idEspecialidad) => {
        try {
            setLoading(true);
            setError(null);
            await medicoEspecialidadService.asignar({ idMedico, idEspecialidad });
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const desasignar = async (idMedico, idEspecialidad) => {
        try {
            setLoading(true);
            setError(null);
            await medicoEspecialidadService.desasignar(idMedico, idEspecialidad);
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        asignar,
        desasignar
    };
};