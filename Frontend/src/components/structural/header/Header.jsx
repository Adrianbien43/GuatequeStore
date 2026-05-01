import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import styles from "./Header.module.css";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const mensajes = [
    "Regístrate para devoluciones con código del producto",
    "Evento especial: ropa de Halloween",
    "Nuevas colecciones de ropa navideña",
    "Recolecta de ropa: 10% de descuento anual"
  ];

  const [indexMensaje, setIndexMensaje] = useState(0);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndexMensaje((prev) => (prev + 1) % mensajes.length);
    }, 4000);
    return () => clearInterval(intervalo);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuAbierto(false);
  };

  const navLinks = [
    { path: "/", label: "Inicio" },
    { path: "/mujer", label: "Mujer" },
    { path: "/hombre", label: "Hombre" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className={styles.header}>
      <div className={styles.banner}>{mensajes[indexMensaje]}</div>

      <div className={styles.menuFila}>
        <Link to="/" className={styles.logoLink}>
          <h4 className={styles.logo}>GS</h4>
        </Link>

        <nav className={styles.navLinks}>
          {navLinks.map((enlace) => (
            <Link
              key={enlace.path}
              to={enlace.path}
              className={isActive(enlace.path) ? styles.activeLink : ""}
            >
              {enlace.label}
            </Link>
          ))}
        </nav>

        <nav className={styles.navLinks}>
          {user ? (
            <>
              <span className={styles.userName}>
                {user.rol === "ADMINISTRADOR" ? "👑" : "👤"} {user.nombre}
              </span>
              {user.rol === "ADMINISTRADOR" && (
                <Link 
                  to="/panel" 
                  className={isActive("/panel") ? styles.activeLink : ""}
                >
                  Panel
                </Link>
              )}
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/registro">Registro</Link>
              <Link to="/iniciar">Iniciar</Link>
            </>
          )}
        </nav>

        <div
          className={styles.menuIcon}
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <div></div><div></div><div></div><div></div>
        </div>
      </div>

      {menuAbierto && (
        <div className={styles.mobileMenu}>
          {navLinks.map((enlace) => (
            <Link
              key={enlace.path}
              to={enlace.path}
              onClick={() => setMenuAbierto(false)}
            >
              {enlace.label}
            </Link>
          ))}
          {user ? (
            <>
              <span className={styles.mobileUserName}>
                {user.rol === "ADMINISTRADOR" ? "👑" : "👤"} {user.nombre}
              </span>
              {user.rol === "ADMINISTRADOR" && (
                <Link to="/panel" onClick={() => setMenuAbierto(false)}>Panel</Link>
              )}
              <button 
                className={styles.mobileLogoutBtn} 
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/registro" onClick={() => setMenuAbierto(false)}>Registro</Link>
              <Link to="/iniciar" onClick={() => setMenuAbierto(false)}>Iniciar</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}