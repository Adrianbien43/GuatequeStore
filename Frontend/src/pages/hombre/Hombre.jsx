import React from "react";
import styles from "./Hombre.module.css";

export default function Hombre() {
  return (
    <div className={styles.hombre}>

      {/* PRIMAVERA */}
      <section className={`${styles.seccion_hombre} ${styles.seccion_primavera}`}>
        <div className={styles.seccion_header}>
          <div className={styles.seccion_titulo1}>
            <span className={styles.titulo1}>
              <h2>Primavera Hombre</h2>
              <h5>Prendas ligeras y estilos frescos</h5>
            </span>
          </div>
          <div className={styles.seccion_card}>
            <button className={`${styles.button} ${styles.button1}`}>
              <span className={styles.actualText}>&nbsp;primavera&nbsp;</span>
              <span aria-hidden="true" className={styles.hoverText}>&nbsp;primavera&nbsp;</span>
            </button>
          </div>
        </div>
        <div className={styles.seccion_footer}>
          <p>Descubre la colección masculina</p>
        </div>
      </section>

      {/* VERANO */}
      <section className={`${styles.seccion_hombre} ${styles.seccion_verano}`}>
        <div className={styles.seccion_header}>
          <div className={styles.seccion_titulo2}>
            <span className={styles.titulo1}>
              <h2>Verano Hombre</h2>
              <h5>Comodidad y frescura para cada día</h5>
            </span>
          </div>
          <div className={styles.seccion_card1}>
            <button className={`${styles.button} ${styles.button2}`}>
              <span className={styles.actualText}>&nbsp;verano&nbsp;</span>
              <span aria-hidden="true" className={styles.hoverText}>&nbsp;verano&nbsp;</span>
            </button>
          </div>
        </div>
        <div className={styles.seccion_footer}>
          <p>Explora looks de verano</p>
        </div>
      </section>

      {/* OTOÑO */}
      <section className={`${styles.seccion_hombre} ${styles.seccion_otoño}`}>
        <div className={styles.seccion_header}>
          <div className={styles.seccion_titulo3}>
            <span className={styles.titulo1}>
              <h2>Otoño Hombre</h2>
              <h5>Estilo urbano y capas funcionales</h5>
            </span>
          </div>
          <div className={styles.seccion_card2}>
            <button className={`${styles.button} ${styles.button3}`}>
              <span className={styles.actualText}>&nbsp;otoño&nbsp;</span>
              <span aria-hidden="true" className={styles.hoverText}>&nbsp;otoño&nbsp;</span>
            </button>
          </div>
        </div>
        <div className={styles.seccion_footer}>
          <p>Moda masculina de temporada</p>
        </div>
      </section>

      {/* INVIERNO */}
      <section className={`${styles.seccion_hombre} ${styles.seccion_invierno}`}>
        <div className={styles.seccion_header}>
          <div className={styles.seccion_titulo4}>
            <span className={styles.titulo1}>
              <h2>Invierno Hombre</h2>
              <h5>Abrigo, carácter y diseño</h5>
            </span>
          </div>
          <div className={styles.seccion_card3}>
            <button className={`${styles.button} ${styles.button4}`}>
              <span className={styles.actualText}>&nbsp;invierno&nbsp;</span>
              <span aria-hidden="true" className={styles.hoverText}>&nbsp;invierno&nbsp;</span>
            </button>
          </div>
        </div>
        <div className={styles.seccion_footer}>
          <p>Prepárate para el frío</p>
        </div>
      </section>

    </div>
  );
}
