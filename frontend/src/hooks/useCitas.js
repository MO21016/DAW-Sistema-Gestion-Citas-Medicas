import { useEffect, useState } from 'react';

import { citaService } from '../services/citaService';

export const useCitas = () => {

  const [citas, setCitas] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const loadCitas = async () => {

    try {

      setLoading(true);

      const data = await citaService.getAll();

      setCitas(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadCitas();

  }, []);

  return {
    citas,
    setCitas,
    loading,
    error,
    reload: loadCitas
  };

};
