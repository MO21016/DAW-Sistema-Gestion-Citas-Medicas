const BASE_URL = import.meta.env.VITE_API_URL;

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error('Error al conectar con la API');
  }
  return response.json();
};

export const dashboardService = {

  getMedicos: async () => {
    const response = await fetch(`${BASE_URL}/medicos`);
    return handleResponse(response);
  },

  getPacientes: async () => {
    const response = await fetch(`${BASE_URL}/pacientes`);
    return handleResponse(response);
  },

  getEspecialidades: async () => {
    const response = await fetch(`${BASE_URL}/especialidades`);
    return handleResponse(response);
  },

  getCitas: async () => {
    const response = await fetch(`${BASE_URL}/citas`);
    return handleResponse(response);
  },

  getCitasPorEstado: async (estado) => {
    const response = await fetch(`${BASE_URL}/citas?estado=${estado}`);
    return handleResponse(response);
  },

};