import { useState } from "react";

export default function FormularioRegister({ onSubmit, loading }) {
  // Estados para los campos del formulario
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    
    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    
    // Verificar que todos los campos estén llenos
    if (!username || !password) {
      alert("Todos los campos son requeridos");
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
      
      <div>
        <label>Confirmar Contraseña:</label>
        <input
          type="password"
          placeholder="Repite tu contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
        />
      </div>
      
      <button type="submit" disabled={loading}>
        {loading ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
}