import React from "react";
import styles from "./Footer.module.css"
import Pompa from "../common/Pompa";

export default function Footer({col1, col2, col3}){
  return(
    <footer className={styles.footer}>
      <div className={styles.contenedor}>
        <div>{col1}</div>
        <div>{col2}</div>
        <div>{col3 || <Pompa />}</div>
      </div>
    </footer>
  );
}