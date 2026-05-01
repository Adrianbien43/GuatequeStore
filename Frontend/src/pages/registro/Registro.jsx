import React, { useState, useContext } from "react";
import styles from "./Registro.module.css";
import { validateRegistro } from "../../validators/registro.validator";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

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
    // Limpiar error al escribir
    if (touched[name]) {
      const validationErrors = validateRegistro({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: validationErrors[name] }));
    }
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
    setTouched({ nombre: true, email: true, password: true, confirm: true });
    
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8080/api/auth/register", {
        nombre: form.nombre,
        email: form.email,
        password: form.password
      });

      login(res.data);
      navigate("/welcome");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error al registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.registro}>
        <div className={styles.header}>
          <h2>GS</h2>
          <p>Crear cuenta</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Nombre */}
          <div className={styles.inputGroup}>
            <label htmlFor="nombre">Nombre completo</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Tu nombre"
              value={form.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.nombre && errors.nombre ? styles.inputError : ""}
            />
            {touched.nombre && errors.nombre && (
              <span className={styles.error}>{errors.nombre}</span>
            )}
          </div>

          {/* Email */}
          <div className={styles.inputGroup}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.email && errors.email ? styles.inputError : ""}
            />
            {touched.email && errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div className={styles.inputGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.password && errors.password ? styles.inputError : ""}
            />
            {touched.password && errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>

          {/* Confirm */}
          <div className={styles.inputGroup}>
            <label htmlFor="confirm">Confirmar contraseña</label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              placeholder="Repite tu contraseña"
              value={form.confirm}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.confirm && errors.confirm ? styles.inputError : ""}
            />
            {touched.confirm && errors.confirm && (
              <span className={styles.error}>{errors.confirm}</span>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={styles.btnSubmit}
          >
            {loading ? (
              <span className={styles.spinner}></span>
            ) : (
              "Crear cuenta"
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p>¿Ya tienes cuenta? <Link to="/iniciar">Inicia sesión</Link></p>
        </div>
      </div>
    </div>
  );
}