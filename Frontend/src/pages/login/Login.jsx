import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password
      });

      // === DIAGNÓSTICO - MUESTRA LA RESPUESTA ===
      console.log("=== RESPUESTA DEL BACKEND ===");
      console.log("Datos completos:", res.data);
      console.log("ID que llega:", res.data.id);
      console.log("idUsuario que llega:", res.data.idUsuario);
      console.log("Todos los campos:", Object.keys(res.data));
      console.log("==============================");

      login(res.data);

      if (res.data.rol === "CLIENTE") navigate("/welcome");
      else if (res.data.rol === "ADMINISTRADOR") navigate("/panel");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.login}>
        <div className={styles.header}>
          <h2>GS</h2>
          <p>Guateque Store</p>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading} className={styles.btnSubmit}>
            {loading ? (
              <span className={styles.spinner}></span>
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p>¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
        </div>
      </div>
    </div>
  );
}