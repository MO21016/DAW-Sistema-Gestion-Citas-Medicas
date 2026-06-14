const BASE_URL = import.meta.env.VITE_API_URL;

const handleResponse = async (response) => {

  if (!response.ok) {

    const error = await response.json()
      .catch(() => ({
        message: 'Error desconocido'
      }));

    throw new Error(error.message);

  }

  if (response.status === 204) {
    return null;
  }

  return response.json();

};

export const citaService = {

  getAll: async () => {

    const response = await fetch(
      `${BASE_URL}/citas`
    );

    return handleResponse(response);

  },

  getById: async (id) => {

    const response = await fetch(
      `${BASE_URL}/citas/${id}`
    );

    return handleResponse(response);

  },

  getByEstado: async (estado) => {

    const response = await fetch(
      `${BASE_URL}/citas?estado=${estado}`
    );

    return handleResponse(response);

  },

  create: async (data) => {

    const response = await fetch(
      `${BASE_URL}/citas`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    );

    return handleResponse(response);

  },

  update: async (id, data) => {

    const response = await fetch(
      `${BASE_URL}/citas/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    );

    return handleResponse(response);

  },

  cambiarEstado: async (id, nuevoEstado) => {

    const response = await fetch(
      `${BASE_URL}/citas/${id}/estado`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nuevoEstado })
      }
    );

    return handleResponse(response);

  },

  delete: async (id) => {

    const response = await fetch(
      `${BASE_URL}/citas/${id}`,
      {
        method: 'DELETE'
      }
    );

    return handleResponse(response);

  }

};
