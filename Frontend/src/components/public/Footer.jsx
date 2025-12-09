import React from "react";
import styles from "./Footer.module.css"
import Pompa from "../common/Pompa";
import sosIcono from "../../assets/icons/O2.png"

export default function Footer({ col1, col2, col3 }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.contenedor}>
        <div>{col1}</div>
        <div>{col2}</div>
        <div className={styles.contenedor3}>
          {col3 || <Pompa />}
          <div className={styles.extra}>
            <img src={sosIcono} alt="icono" className={styles.icono} />
          </div>
        </div>
      </div>
    </footer>
  );
}