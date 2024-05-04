// apiHelpers.js

const API_URL_BACKEND = 'http://52.23.237.218/api';

export async function fetchEspecialidades() {
    try {
        const response = await fetch(`${API_URL_BACKEND}${'/medico/especialidades/listar/'}`);
        if (!response.ok) {
            throw new Error('Failed to fetch especialidades');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching especialidades:', error);
        throw error;
    }
}
