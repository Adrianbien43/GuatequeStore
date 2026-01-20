import React, { useState, useEffect } from "react";
import { usuarioService } from "../../../services/customerService"; // Cambiado
import UsuarioForm from "./UsuarioForm"; // Cambiado
import UsuarioList from "./UsuarioList"; // Cambiado
import styles from "./FormUsuarios.module.css"; // Cambiado

const FormUsuarios = () => { // Cambiado
  const [usuario, setUsuario] = useState({ // Cambiado
    nombre: "",
    email: "",
    contraseña: "", // Cambiado de "password"
    direccion: "",
    rol: "CLIENTE" // Campo nuevo
  });

  const [usuarios, setUsuarios] = useState([]); // Cambiado
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadUsuarios = async () => { // Cambiado
    try {
      setLoading(true);
      const data = await usuarioService.getAll(); // Cambiado
      setUsuarios(data); // Cambiado
    } catch (e) {
      setError("Error cargando usuarios: " + (e.message || e)); // Cambiado
    } finally {
      setLoading(false);
    }
  };

  const createUsuario = async () => { // Cambiado
    try {
      setLoading(true);
      await usuarioService.create(usuario); // Cambiado
      await loadUsuarios();
    } catch (e) {
      setError("Error creando usuario: " + (e.message || e)); // Cambiado
    } finally {
      setLoading(false);
    }
  };

  const removeUsuario = async (id) => { // Cambiado
    try {
      setLoading(true);
      await usuarioService.delete(id); // Cambiado
      await loadUsuarios();
    } catch (e) {
      setError("Error eliminando usuario: " + (e.message || e)); // Cambiado
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsuarios();
  }, []);

  const handleChange = (e) =>
    setUsuario({ ...usuario, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUsuario();
    setUsuario({ 
      nombre: "", 
      email: "", 
      contraseña: "", // Cambiado
      direccion: "",
      rol: "CLIENTE" 
    });
  };

  const handleDelete = (id, nombre) => {
    if (window.confirm(`¿Eliminar al usuario "${nombre}"?`)) { // Cambiado
      removeUsuario(id);
    }
  };

  return (
    <div className={styles.container}>
      <h3>Gestión de Usuarios</h3> {/* Cambiado */}

      {error && <div className={styles.error}>{error}</div>}

      <UsuarioForm // Cambiado
        usuario={usuario}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
        styles={styles}
      />

      <UsuarioList // Cambiado
        usuarios={usuarios} // Cambiado
        loading={loading}
        onDelete={handleDelete}
        styles={styles}
      />
    </div>
  );
};

export default FormUsuarios;