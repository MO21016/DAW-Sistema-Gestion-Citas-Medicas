import { useEffect, useState } from 'react';

import { especialidadService } from '../services/especialidadService';

export const useEspecialidades = () => {

    const [especialidades, setEspecialidades] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const loadEspecialidades = async () => {

        try {

            setLoading(true);

            const data = await especialidadService.getAll();

            setEspecialidades(data);

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadEspecialidades();

    }, []);

    return {
        especialidades,
        setEspecialidades,
        loading,
        error,
        reload: loadEspecialidades
    };

};