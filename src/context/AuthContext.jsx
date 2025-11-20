import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const predefinedAdmins = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "tuusuario", password: "tucontraseña", role: "admin" }
  ];

  useEffect(() => {
    const userSaved = localStorage.getItem("user");
    if (userSaved) {
      try {
        setUser(JSON.parse(userSaved));
      } catch (error) {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const register = (username, password) => {
    return { 
      success: false, 
      message: "El registro público está desactivado. Contacta al administrador." 
    };
  };

  const login = (username, password) => {
    if (username && password) {
      const foundAdmin = predefinedAdmins.find(
        u => u.username === username && u.password === password
      );
      
      if (foundAdmin) {
        const userData = { 
          id: foundAdmin.username,
          name: foundAdmin.username,
          role: foundAdmin.role,
          token: "admin-token-" + Date.now()
        };
        
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        
        return { success: true, message: "Acceso de administrador concedido" };
      }
      
      return { success: false, message: "Credenciales de administrador incorrectas" };
    }
    
    return { success: false, message: "Usuario y contraseña son requeridos" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}