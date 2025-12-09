import { useState } from "react";

export default function FormularioLogin({ onSubmit, loading }) {
  // Estados para los campos del formulario
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto
    
    // Verificar que los campos no estén vacíos
    if (!username || !password) {
      alert("Usuario y contraseña son requeridos");
      return;
    }
    
    // Llamar a la función onSubmit que viene desde el componente padre
    onSubmit(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Usuario:</label>
        <input
          type="text"
          placeholder="Escribe tu usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />
      </div>
      
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          placeholder="Escribe tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>
      
      <button type="submit" disabled={loading}>
        {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
      </button>
    </form>
  );
}