import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import FormularioLogin from "../../../components/public/adminpubliclogin/FormularioLogin";

export default function Login() {
  // Obtener funciones del contexto de autenticación
  const { user, login } = useAuth();
  
  // Hook para redireccionar
  const navigate = useNavigate();
  
  // Estados para manejar mensajes y carga
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Si el usuario ya está logueado, mostrar mensaje
  if (user) {
    return (
      <div>
        <h1>Ya estás logueado</h1>
        <p>Bienvenido de nuevo, <strong>{user.name}</strong></p>
        <p>¿Qué te gustaría hacer?</p>
        <Link to="/admin/dashboard">Ir al Panel de Control</Link> | 
        <Link to="/">Seguir comprando</Link>
      </div>
    );
  }

  // Función que maneja el login
  const handleLogin = async (username, password) => {
    setLoading(true);
    setMessage("");
    
    // Llamar a la función de login del contexto
    const result = login(username, password);
    
    if (result.success) {
      // Si el login fue exitoso, mostrar mensaje y redireccionar
      setMessage("✅ " + result.message);
      setTimeout(() => {
        navigate("/admin/dashboard"); // Ir al panel de administración
      }, 1000);
    } else {
      // Si hubo error, mostrar mensaje
      setMessage("❌ " + result.message);
    }
    
    setLoading(false);
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <p>Accede a tu cuenta para una experiencia personalizada</p>
      
      {/* Mostrar mensaje de éxito o error */}
      {message && <p>{message}</p>}
      
      {/* Formulario de login */}
      <FormularioLogin onSubmit={handleLogin} loading={loading} />
      
      {/* Enlace para ir al registro */}
      <p>
        ¿No tienes cuenta? <Link to="/auth/register">Regístrate primero aquí</Link>
      </p>
    </div>
  );
}