import { createContext, useContext, useEffect, useState } from "react";

// Crear el contexto para la autenticación
const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación
export function useAuth() {
  return useContext(AuthContext);
}

// Proveedor que envuelve la aplicación y maneja la autenticación
export function AuthProvider({ children }) {
  // Estado para guardar el usuario actual (null si no hay usuario logueado)
  const [user, setUser] = useState(null);

  // Efecto que se ejecuta al cargar la aplicación
  // Verifica si hay un usuario guardado en el localStorage
  useEffect(() => {
    const userSaved = localStorage.getItem("user");
    if (userSaved) {
      try {
        setUser(JSON.parse(userSaved));
      } catch (error) {
        // Si hay error al leer, limpiamos el localStorage
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Función para registrar un nuevo usuario
  const register = (username, password) => {
    // Verificar que se hayan ingresado usuario y contraseña
    if (username && password) {
      // Obtener la lista de usuarios registrados del localStorage
      // Si no hay usuarios, creamos un array vacío
      const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      
      // Verificar si el usuario ya existe
      const userExists = users.find(u => u.username === username);
      if (userExists) {
        return { success: false, message: "El usuario ya existe" };
      }
      
      // Crear nuevo usuario
      const newUser = { 
        id: Date.now(), // Usamos la fecha como ID único
        username, 
        password, // En una app real esto estaría encriptado
        createdAt: new Date().toISOString()
      };
      
      // Agregar el nuevo usuario a la lista
      users.push(newUser);
      // Guardar la lista actualizada en localStorage
      localStorage.setItem("registeredUsers", JSON.stringify(users));
      
      return { success: true, message: "Registro exitoso" };
    }
    return { success: false, message: "Usuario y contraseña son requeridos" };
  };

  // Función para iniciar sesión
  const login = (username, password) => {
    // Verificar que se hayan ingresado usuario y contraseña
    if (username && password) {
      // Obtener la lista de usuarios registrados
      const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      
      // Buscar el usuario en la lista
      const foundUser = users.find(u => u.username === username && u.password === password);
      
      // Si encontramos el usuario
      if (foundUser) {
        // Crear datos de sesión del usuario
        const userData = { 
          id: foundUser.id, 
          name: foundUser.username,
          token: "token-" + foundUser.id
        };
        
        // Guardar usuario en el estado y en localStorage
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        
        return { success: true, message: "Login exitoso" };
      }
      
      return { success: false, message: "Usuario o contraseña incorrectos" };
    }
    
    return { success: false, message: "Usuario y contraseña son requeridos" };
  };

  // Función para cerrar sesión
  const logout = () => {
    // Limpiar el usuario del estado y del localStorage
    setUser(null);
    localStorage.removeItem("user");
  };

  // Valores que estarán disponibles en toda la aplicación
  const value = {
    user,           // Usuario actual (null si no hay sesión)
    register,       // Función para registrar
    login,          // Función para iniciar sesión
    logout          // Función para cerrar sesión
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}