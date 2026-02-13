import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import styles from "./Header.module.css";

export default function Header() {
  const mensajes = [
    "Regístrate para devoluciones con código del producto",
    "Evento especial: ropa de Halloween",
    "Nuevas colecciones de ropa navideña",
    "Recolecta de ropa: 10% de descuento anual"
  ];

  const [indexMensaje, setIndexMensaje] = useState(0);
  const [menuAbierto, setMenuAbierto] = useState(false);

  const enlaces = [
    { path: "/", label: "Inicio" },
    { path: "/mujer", label: "Mujer" },
    { path: "/hombre", label: "Hombre" },
    { path: "/registro", label: "Registro" },
    { path: "/iniciar", label: "Iniciar" },
  ];

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndexMensaje((prev) => (prev + 1) % mensajes.length);
    }, 4000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.banner}>{mensajes[indexMensaje]}</div>

      <div className={styles.menuFila}>
        <h4 className={styles.logo}>GS</h4>

        <nav className={styles.navLinks}>
          {enlaces.slice(0, 3).map((enlace) => (
            <Link key={enlace.path} to={enlace.path}>{enlace.label}</Link>
          ))}
        </nav>

        <nav className={styles.navLinks}>
          {enlaces.slice(3).map((enlace) => (
            <Link key={enlace.path} to={enlace.path}>{enlace.label}</Link>
          ))}
        </nav>

        <div
          className={styles.menuIcon}
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      {menuAbierto && (
        <div className={styles.mobileMenu}>
          {enlaces.map((enlace) => (
            <Link
              key={enlace.path}
              to={enlace.path}
              onClick={() => setMenuAbierto(false)}
            >
              {enlace.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
