import { useEffect, useState } from 'react';

import { pacienteService } from '../services/pacienteService';

export const usePacientes = () => {

  const [pacientes, setPacientes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const loadPacientes = async () => {

    try {

      setLoading(true);

      const data = await pacienteService.getAll();

      setPacientes(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadPacientes();

  }, []);

  return {
    pacientes,
    setPacientes,
    loading,
    error,
    reload: loadPacientes
  };

};