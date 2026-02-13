import React, { useState, useEffect } from "react";
import styles from "./Cargando.module.css";

export default function Cargando({ onFinish }) {
  const [abierta, setAbierta] = useState(false);

  useEffect(() => {
    // Abrir puertas inmediatamente
    const abrir = setTimeout(() => setAbierta(true), 100);

    // Avisar que terminó la animación después de 1s
    const terminar = setTimeout(() => {
      if (onFinish) onFinish();
    }, 1100); // debe ser >= duration del transition

    return () => {
      clearTimeout(abrir);
      clearTimeout(terminar);
    };
  }, [onFinish]);

  return (
    <div className={styles.contenedor}>
        <span className={styles.mensaje}>Felices fiestas</span>
      <div className={`${styles.puerta1} ${abierta ? styles.puerta1Abierta : ""}`}></div>
      <div className={`${styles.puerta2} ${abierta ? styles.puerta2Abierta : ""}`}></div>
    </div>
  );
}
