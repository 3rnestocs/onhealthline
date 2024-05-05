import React, { useContext, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const API_URL_BACKEND = 'http://52.23.237.218/api';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const navigate = useNavigate();

    const loginAction = async (data) => {
        try {
            const response = await fetch(`${API_URL_BACKEND}/auth/login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.Message}`);
            }

            const res = await response.json();

            if (res.token && res.user) {
                setUser(res.user);
                setToken(res.token);
                localStorage.setItem("user", JSON.stringify(res.user))
                localStorage.setItem("token", res.token);
                console.log("user:", res.user);
                navigate(res.user.user_type === "PACIENTE" ? "/schedules" : "/myschedules");
            } else {
                throw new Error("Invalid response format");
            }
        } catch (err) {
            // console.error(err);
            throw new Error(err);
        }
    };

    const registerAction = async (data) => {
        try {
            const response = await fetch(`${API_URL_BACKEND}/auth/register/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.Message}`);
            }

            const res = await response.json();

            console.log("request 2:", res);
            if (res.message) {
                loginAction({ email: data.email, password: data.password });
            } else {
                throw new Error("Invalid response format");
            }
        } catch (err) {
            throw new Error(err);
        }
    };

    const agendarCita = async (data) => {
        try {
            const response = await fetch(`${API_URL_BACKEND}/citas/create-event/`, {
                method: "POST",
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const res = await response.json();

            console.log("response:", res);
            // if (res.message) {

            // } else {
            //     throw new Error("Invalid response format");
            // }
        } catch (err) {
            throw new Error(err);
        }
    };

    const actualizarPerfil = async (id, params) => {
        try {
            const response = await fetch(`${API_URL_BACKEND}/auth/update/${id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(params),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const res = await response.json();

            console.log("response actualizarPerfil:", res);
            if (res.message == "UPDATE_OK") {
                localStorage.setItem("user", JSON.stringify(res.data))
            } else {
                throw new Error("Invalid response format");
            }
        } catch (err) {
            throw new Error(err);
        }
    };

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
        navigate("/access");
    };

    const listAllDoctors = async () => {
        try {
            const response = await fetch(`${API_URL_BACKEND}/medico/medico/listar`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const doctors = await response.json();
            return doctors;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const requestDoctorSchedule = async (doctor_id) => {
        try {
            const response = await fetch(`${API_URL_BACKEND}/medico/horario/obtener/?id_medico=${doctor_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const schedule = await response.json();
            return schedule;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const listEvents = async () => {
        try {
            const response = await fetch(`${API_URL_BACKEND}/citas/list-events/`, {
                method: "GET",
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 401) {
                // Manejar el caso de no autorizado (Unauthorized)
                throw new Error("Unauthorized: Token is invalid or expired.");
            }

            if (!response.ok) {
                // Manejar otros errores de HTTP
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const events = await response.json();
            return events;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ token, user, loginAction, registerAction, logOut, listAllDoctors, requestDoctorSchedule, agendarCita, listEvents, actualizarPerfil }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
