import React from "react";
import styles from "./Mujer.module.css";

export default function Mujer() {
  return (
    <div className={styles.mujer}>

      {/* PRIMAVERA */}
      <section className={`${styles.seccion_mujer} ${styles.seccion_primavera}`}>

        <div className={styles.seccion_header}>
          <div className={styles.seccion_titulo1}>
            <span className={styles.titulo1}>
              <h2>Moda Primavera</h2>
              <h5>Renueva tu estilo con los colores de la estación</h5>
            </span>
          </div>
          <div className={styles.seccion_card}>
            <button className={`${styles.button} ${styles.button1}`} data-text="Awesome">
              <span className={styles.actualText}>&nbsp;uiverse&nbsp;</span>
              <span aria-hidden="true" className={styles.hoverText}>&nbsp;uiverse&nbsp;</span>
            </button>
          </div>
        </div>

        <div className={styles.seccion_footer}>
          <p>Explora la colección</p>
        </div>

      </section>

      {/* VERANO */}
      <section className={`${styles.seccion_mujer} ${styles.seccion_verano}`}>
        <div className={styles.seccion_header}>
          <div className={styles.seccion_titulo1}>
            <span className={styles.titulo1}>
              <h2>Moda Primavera</h2>
              <h5>Renueva tu estilo con los colores de la estación</h5>
            </span>
          </div>
          <div className={styles.seccion_card}>
            <button className={`${styles.button} ${styles.button2}`} data-text="Awesome">
              <span className={styles.actualText}>&nbsp;uiverse&nbsp;</span>
              <span aria-hidden="true" className={styles.hoverText}>&nbsp;uiverse&nbsp;</span>
            </button>
          </div>
        </div>

        <div className={styles.seccion_footer}>
          <p>Explora la colección</p>
        </div>
      </section>

      {/* OTOÑO */}
      <section className={`${styles.seccion_mujer} ${styles.seccion_otoño}`}>
        <div className={styles.seccion_header}>
          <div className={styles.seccion_titulo1}>
            <span className={styles.titulo1}>
              <h2>Moda Primavera</h2>
              <h5>Renueva tu estilo con los colores de la estación</h5>
            </span>
          </div>
          <div className={styles.seccion_card}>
            <button className={`${styles.button} ${styles.button3}`} data-text="Awesome">
              <span className={styles.actualText}>&nbsp;uiverse&nbsp;</span>
              <span aria-hidden="true" className={styles.hoverText}>&nbsp;uiverse&nbsp;</span>
            </button>
          </div>
        </div>

        <div className={styles.seccion_footer}>
          <p>Explora la colección</p>
        </div>
      </section>

      {/* INVIERNO */}
      <section className={`${styles.seccion_mujer} ${styles.seccion_invierno}`}>
        <div className={styles.seccion_header}>
          <div className={styles.seccion_titulo1}>
            <span className={styles.titulo1}>
              <h2>Moda Primavera</h2>
              <h5>Renueva tu estilo con los colores de la estación</h5>
            </span>
          </div>
          <div className={styles.seccion_card}>
            <button className={`${styles.button} ${styles.button4}`} data-text="Awesome">
              <span className={styles.actualText}>&nbsp;uiverse&nbsp;</span>
              <span aria-hidden="true" className={styles.hoverText}>&nbsp;uiverse&nbsp;</span>
            </button>
          </div>
        </div>

        <div className={styles.seccion_footer}>
          <p>Explora la colección</p>
        </div>
      </section>

    </div>
  );
}
