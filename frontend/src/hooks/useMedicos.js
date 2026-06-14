import { useEffect, useState } from 'react';
import { medicoService } from '../services/medicoService';

export const useMedicos = () => {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return {
    medicos,
    setMedicos,
    loading,
    error,
    reload: loadMedicos
  };
};
