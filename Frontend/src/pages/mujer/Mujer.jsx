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
              <span className={styles.actualText}>&nbsp;primavera&nbsp;</span>
              <span aria-hidden="true" className={styles.hoverText}>&nbsp;primavera&nbsp;</span>
            </button>
          </div>
        </div>

        <div className={styles.seccion_footer}>
          <p>Chaquetas finas, flores y tejidos cómodos: la moda de primavera es equilibrio entre elegancia y comodidad.</p>
        </div>

      </section>

      {/* VERANO */}
      <section className={`${styles.seccion_mujer} ${styles.seccion_verano}`}>
        <div className={styles.seccion_header}>
          <div className={styles.seccion_titulo2}>
            <span className={styles.titulo1}>
              <h2>Moda Verano</h2>
              <h5>Verano, vive con libertad y estilo</h5>
            </span>
          </div>
          <div className={styles.seccion_card1}>
            <button className={`${styles.button} ${styles.button2}`} data-text="Awesome">
              <span className={styles.actualText}>&nbsp;verano&nbsp;</span>
              <span aria-hidden="true" className={styles.hoverText}>&nbsp;verano&nbsp;</span>
            </button>
          </div>
        </div>

        <div className={styles.seccion_footer}>
          <p>El verano es libertad pura donde tu ropa se vuelve ligera y tu estilo más auténtico que nunca</p>
        </div>
      </section>

      {/* OTOÑO */}
      <section className={`${styles.seccion_mujer} ${styles.seccion_otoño}`}>
        <div className={styles.seccion_header}>
          <div className={styles.seccion_titulo3}>
            <span className={styles.titulo1}>
              <h2>Moda Otoño</h2>
              <h5>Otoño, momento de reinventarte</h5>
            </span>
          </div>
          <div className={styles.seccion_card2}>
            <button className={`${styles.button} ${styles.button3}`} data-text="Awesome">
              <span className={styles.actualText}>&nbsp;otoño&nbsp;</span>
              <span aria-hidden="true" className={styles.hoverText}>&nbsp;otoño&nbsp;</span>
            </button>
          </div>
        </div>

        <div className={styles.seccion_footer}>
          <p>Las capas suaves y tonos cálidos expresan tu personalidad con elegancia</p>
        </div>
      </section>

      {/* INVIERNO */}
      <section className={`${styles.seccion_mujer} ${styles.seccion_invierno}`}>
        <div className={styles.seccion_header}>
          <div className={styles.seccion_titulo4}>
            <span className={styles.titulo1}>
              <h2>Moda Invierno</h2>
              <h5>Invierno, actitud que abriga</h5>
            </span>
          </div>
          <div className={styles.seccion_card3}>
            <button className={`${styles.button} ${styles.button4}`} data-text="Awesome">
              <span className={styles.actualText}>&nbsp;invierno&nbsp;</span>
              <span aria-hidden="true" className={styles.hoverText}>&nbsp;invierno&nbsp;</span>
            </button>
          </div>
        </div>

        <div className={styles.seccion_footer}>
          <p>Cada abrigo refleja tu fuerza y tu estilo en los días más fríos</p>
        </div>
      </section>

    </div>
  );
}
