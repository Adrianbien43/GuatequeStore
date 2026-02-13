// Footer.jsx
import React, { useState, useEffect } from "react";
import styles from "./Footer.module.css";
import { FaTwitter, FaYoutube, FaGithub } from "react-icons/fa";
import { SiX } from "react-icons/si";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Primera sección */}
      <div className={styles.topSection}>
        {/* Div de iconos */}
        <div className={styles.socialIcons}>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <SiX />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
        </div>

        <div className={styles.quickInfo}>
          <h3>Compromiso Ambiental</h3>
          <p>
            Estamos comprometidos con la protección del medio ambiente mediante
            prácticas sostenibles y uso responsable de los recursos.
          </p>
        </div>
      </div>

      <div className={styles.bottomSection}>
        © 2025 Todos los derechos reservados.
      </div>
    </footer>
  );
}
