import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import FormularioRegister from "../../../components/public/adminpubliclogin/FormularioRegister";

export default function Register() {
  // Obtener funciones del contexto de autenticación
  const { user, register } = useAuth();
  
  // Hook para redireccionar a otras páginas
  const navigate = useNavigate();
  
  // Estados para manejar mensajes y carga
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Si el usuario ya está logueado, mostrar mensaje
  if (user) {
    return (
      <div>
        <h1>Ya tienes una cuenta</h1>
        <p>Ya estás logueado como: <strong>{user.name}</strong></p>
        <p>Si quieres crear otra cuenta, primero cierra sesión.</p>
        <Link to="/admin/dashboard">Ir al Panel de Control</Link> | 
        <Link to="/">Volver al Inicio</Link>
      </div>
    );
  }

  // Función que maneja el registro
  const handleRegister = async (username, password) => {
    setLoading(true);
    setMessage("");
    
    // Llamar a la función de registro del contexto
    const result = register(username, password);
    
    if (result.success) {
      // Si el registro fue exitoso, mostrar mensaje y redireccionar después de 2 segundos
      setMessage("✅ " + result.message);
      setTimeout(() => {
        navigate("/auth/login"); // Ir a la página de login
      }, 2000);
    } else {
      // Si hubo error, mostrar mensaje de error
      setMessage("❌ " + result.message);
    }
    
    setLoading(false);
  };

  return (
    <div>
      <h1>Crear Cuenta Nueva</h1>
      <p>Regístrate para acceder a todas las funciones</p>
      
      {/* Mostrar mensaje de éxito o error */}
      {message && (
        <div>
          <p>{message}</p>
          {message.includes("éxito") && <p>Redirigiendo al login...</p>}
        </div>
      )}
      
      {/* Formulario de registro */}
      <FormularioRegister onSubmit={handleRegister} loading={loading} />
      
      {/* Enlace para ir al login */}
      <p>
        ¿Ya tienes cuenta? <Link to="/auth/login">Inicia sesión aquí</Link>
      </p>
           <p>
        ¿Quieres ir al inicio? <Link to="/">Pulsa aqui </Link>
      </p>
    </div>
  );
}