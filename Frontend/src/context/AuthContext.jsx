import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        try {
            const savedToken = localStorage.getItem("token");
            const savedUser = localStorage.getItem("user");
            if (savedToken && savedUser) {
                const userData = JSON.parse(savedUser);
                setToken(savedToken);
                setUser(userData);
            }
        } catch (error) {
            console.error("Error al cargar datos de autenticación:", error);
            // Limpiar datos corruptos para evitar bucles de error
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    }, []);

    const login = (data) => {
        setToken(data.token);
        setUser({ id: data.id || data.idUsuario, nombre: data.nombre, email: data.email, rol: data.rol });
        localStorage.setItem("token", data.token);
        localStorage.setItem(
            "user",
            JSON.stringify({ id: data.id || data.idUsuario, nombre: data.nombre, email: data.email, rol: data.rol })
        );
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};