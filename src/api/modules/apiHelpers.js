// apiHelpers.js

import { API_URL_BACKEND } from "../axiosAPI";

export async function fetchEspecialidades() {
    try {
        const response = await fetch(`${API_URL_BACKEND}${'/medico/Listar_Especialidades/'}`);
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
