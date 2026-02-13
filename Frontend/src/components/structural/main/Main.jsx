import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ErrorBoundary from "../error/ErrorBoundary";
import styles from "./Main.module.css";
import Cargando from "../cargando/Cargando";

export default function Main({ children }) { 
  const [loading, setLoading] = useState(true);
  const location = useLocation(); 

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]); 

  return (
    <main className={styles.elmain}>
      {loading ? (
        <Cargando onFinish={() => setLoading(false)} />
      ) : (
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      )}
    </main>
  );
}