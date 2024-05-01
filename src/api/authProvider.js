import { useContext, useState, createContext } from "react";
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
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const res = await response.json();

            if (res.Token && res.user) {
                setUser(res.user);
                setToken(res.Token);
                localStorage.setItem("token", res.Token);
                navigate("/schedules");
            } else {
                throw new Error("Invalid response format");
            }
        } catch (err) {
            console.error(err);
            setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
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
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const res = await response.json();

            if (res.message) {
                loginAction({ email: data.email, password: data.password });
            } else {
                throw new Error("Invalid response format");
            }
        } catch (err) {
            console.error(err);
            setError('Error al registrarse. Por favor, inténtalo de nuevo.');
        }
    };

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
        navigate("/access");
    };

    return (
        <AuthContext.Provider value={{ token, user, loginAction, registerAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};