import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ← Agrega esto
import { useAuth } from "../../../context/AuthContext";
import FormularioLogin from "../../../components/public/adminpubliclogin/FormularioLogin";

export default function Login() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // ← Agrega esto

  const handleLogin = async (username, password) => {
    setLoading(true);
    setMessage("");
    
    const result = login(username, password);
    
    setMessage(result.message);
    setLoading(false);
    
    // ← AGREGA ESTO: Redirigir si el login fue exitoso
    if (result.success) {
      setTimeout(() => {
        navigate("/admin/dashboard"); // ← Redirige al dashboard
      }, 1000); // Pequeño delay para ver el mensaje de éxito
    }
  };

  return (
    <div>
      <h2>Acceso de Administrador</h2>
      
      {message && (
        <div>
          {message}
        </div>
      )}
      
      <FormularioLogin onSubmit={handleLogin} loading={loading} />
      
      <div>
        <p>Acceso restringido al equipo administrativo</p>
      </div>
    </div>
  );
}