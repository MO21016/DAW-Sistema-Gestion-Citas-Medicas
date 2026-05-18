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

export const especialidadService = {

    getAll: async () => {

        const response = await fetch(
            `${BASE_URL}/especialidades`
        );

        return handleResponse(response);

    },

    create: async (data) => {

        const response = await fetch(
            `${BASE_URL}/especialidades`,
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
            `${BASE_URL}/especialidades/${id}`,
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

    delete: async (id) => {

        const response = await fetch(
            `${BASE_URL}/especialidades/${id}`,
            {
                method: 'DELETE'
            }
        );

        return handleResponse(response);

    }

};