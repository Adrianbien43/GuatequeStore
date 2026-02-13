import React, { useState, useContext } from "react";
import styles from "./Registro.module.css";
import { validateRegistro } from "../../validators/registro.validator";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const initialForm = {
  nombre: "",
  email: "",
  password: "",
  confirm: ""
};

export default function Registro() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const validationErrors = validateRegistro(form);
    setErrors(validationErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateRegistro(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);
      // Cambia la URL por tu endpoint real
      const res = await axios.post("http://localhost:8080/api/auth/register", {
        nombre: form.nombre,
        email: form.email,
        password: form.password
      });

      // Al registrarse, también hacemos login automático
      login(res.data);
      navigate("/welcome"); // Redirige a bienvenida del cliente
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error al registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registro}>
      <h2>Crear cuenta</h2>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {/* Nombre */}
        <input
          name="nombre"
          placeholder="Nombre completo"
          value={form.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.nombre && errors.nombre && (
          <small className={styles.error}>{errors.nombre}</small>
        )}

        {/* Email */}
        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.email && errors.email && (
          <small className={styles.error}>{errors.email}</small>
        )}

        {/* Password */}
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.password && errors.password && (
          <small className={styles.error}>{errors.password}</small>
        )}

        {/* Confirm */}
        <input
          name="confirm"
          type="password"
          placeholder="Confirmar contraseña"
          value={form.confirm}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.confirm && errors.confirm && (
          <small className={styles.error}>{errors.confirm}</small>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
}
