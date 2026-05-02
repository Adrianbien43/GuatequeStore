import React, { useState, useContext } from "react";
import styles from "./Registro.module.css";
import { validateRegistro, getRegistroWarnings, getFieldRequirements } from "../../validators/registro.validator";
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
  const [warnings, setWarnings] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setBackendError(""); // Limpiar error del backend al escribir
    
    // Validar en tiempo real si el campo ya fue tocado
    if (touched[name]) {
      const validationErrors = validateRegistro({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: validationErrors[name] || "" }));
      
      // Mostrar warnings para contraseña
      if (name === "password") {
        const newWarnings = getRegistroWarnings({ ...form, [name]: value });
        setWarnings((prev) => ({ ...prev, [name]: newWarnings[name] || "" }));
      }
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    // Validar al salir del campo
    const validationErrors = validateRegistro(form);
    setErrors(validationErrors);
    
    // Obtener warnings si existen
    const newWarnings = getRegistroWarnings(form);
    setWarnings(newWarnings);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBackendError("");
    
    // Validar todos los campos
    const validationErrors = validateRegistro(form);
    setErrors(validationErrors);
    setTouched({ nombre: true, email: true, password: true, confirm: true });
    
    // Si hay errores, no enviar
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8080/api/auth/register", {
        nombre: form.nombre.trim(),
        email: form.email.trim(),
        password: form.password
      });

      login(res.data);
      navigate("/welcome");
    } catch (err) {
      console.error(err);
      // Manejar diferentes errores del backend
      const errorMessage = err.response?.data?.message || err.message;
      
      if (errorMessage?.includes("email") && errorMessage?.includes("registrado")) {
        setBackendError("⚠️ Este email ya está registrado. ¿Quizás quieres iniciar sesión?");
        setErrors((prev) => ({ ...prev, email: "Email ya registrado" }));
      } else if (errorMessage?.includes("contraseña")) {
        setBackendError("⚠️ La contraseña no cumple los requisitos de seguridad");
      } else if (errorMessage?.includes("nombre")) {
        setBackendError("⚠️ El nombre no es válido");
      } else {
        setBackendError(`⚠️ Error: ${errorMessage}`);
      }
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

        {backendError && (
          <div className={styles.globalError}>
            {backendError}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Nombre */}
          <div className={styles.inputGroup}>
            <label htmlFor="nombre">
              Nombre completo
              <span className={styles.requirement}>(requerido)</span>
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Ej: Juan Pérez López"
              value={form.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.nombre && errors.nombre ? styles.inputError : ""}
              maxLength="100"
            />
            {touched.nombre && errors.nombre && (
              <span className={styles.error}>{errors.nombre}</span>
            )}
            {!errors.nombre && form.nombre && (
              <span className={styles.hint}>
                ✓ Nombre válido ({form.nombre.trim().length}/100 caracteres)
              </span>
            )}
            {!touched.nombre && (
              <span className={styles.requirement}>
                {getFieldRequirements("nombre")}
              </span>
            )}
          </div>

          {/* Email */}
          <div className={styles.inputGroup}>
            <label htmlFor="email">
              Correo electrónico
              <span className={styles.requirement}>(requerido)</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Ej: tu@ejemplo.com"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.email && errors.email ? styles.inputError : ""}
              autoComplete="email"
            />
            {touched.email && errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
            {!errors.email && form.email && (
              <span className={styles.hint}>
                ✓ Email válido - Lo usarás para iniciar sesión
              </span>
            )}
            {!touched.email && (
              <span className={styles.requirement}>
                {getFieldRequirements("email")}
              </span>
            )}
          </div>

          {/* Password */}
          <div className={styles.inputGroup}>
            <label htmlFor="password">
              Contraseña
              <span className={styles.requirement}>(requerido)</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Mínimo 8 caracteres (letras y números)"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.password && errors.password ? styles.inputError : ""}
              autoComplete="new-password"
            />
            {touched.password && errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
            {touched.password && warnings.password && (
              <span className={styles.warning}>⚡ {warnings.password}</span>
            )}
            {!errors.password && form.password && form.password.length >= 8 && (
              <span className={styles.hint}>
                ✓ Contraseña válida ({form.password.length} caracteres)
              </span>
            )}
            {!touched.password && (
              <span className={styles.requirement}>
                {getFieldRequirements("password")}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div className={styles.inputGroup}>
            <label htmlFor="confirm">
              Confirmar contraseña
              <span className={styles.requirement}>(requerido)</span>
            </label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              placeholder="Repite tu contraseña"
              value={form.confirm}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.confirm && errors.confirm ? styles.inputError : ""}
              autoComplete="new-password"
            />
            {touched.confirm && errors.confirm && (
              <span className={styles.error}>{errors.confirm}</span>
            )}
            {!errors.confirm && form.confirm && form.password === form.confirm && (
              <span className={styles.hint}>
                ✓ Las contraseñas coinciden
              </span>
            )}
            {!touched.confirm && (
              <span className={styles.requirement}>
                {getFieldRequirements("confirm")}
              </span>
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
          <p>¿Ya tienes cuenta? <Link to="/iniciar">Inicia sesión aquí</Link></p>
        </div>
      </div>
    </div>
  );
}