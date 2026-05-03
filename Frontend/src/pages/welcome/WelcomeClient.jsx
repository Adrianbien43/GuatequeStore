import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "./WelcomeClient.module.css";

export default function WelcomeClient() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1>Bienvenido a Guateque Store</h1>
          <p>Moda exclusiva para todos los estilos.</p>
          <div className={styles.actions}>
            <Link to="/mujer" className={styles.btnPrimary}>Mujer</Link>
            <Link to="/hombre" className={styles.btnPrimary}>Hombre</Link>
            <Link to="/iniciar" className={styles.btnSecondary}>Iniciar sesión</Link>
          </div>
        </div>
      </div>
    );
  }

  const esAdmin = user.rol === "ADMINISTRADOR";
  const nombre = user.nombre || "Usuario";

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>
            {esAdmin ? "👑 Administrador" : "🛍️ Cliente VIP"}
          </span>
          <h1>
            {esAdmin ? `Hola, ${nombre}` : `¡Bienvenido, ${nombre}!`}
          </h1>
          <p>
            {esAdmin
              ? "Gestiona tu tienda desde aquí. Accede al panel para administrar productos, pedidos e inventario."
              : "Descubre nuestras colecciones exclusivas. Explora por categoría o revisa tus pedidos."}
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>{esAdmin ? "Acciones rápidas" : "Explorar"}</h2>
        <div className={styles.grid}>
          {esAdmin ? (
            <>
              <Link to="/panel" className={`${styles.card} ${styles.cardAdmin}`}>
                <span className={styles.cardIcon}>📊</span>
                <h3>Panel Admin</h3>
                <p>Gestionar productos, pedidos e inventario</p>
              </Link>
              <Link to="/hombre" className={styles.card}>
                <span className={styles.cardIcon}>👔</span>
                <h3>Ver Hombre</h3>
                <p>Catálogo masculino</p>
              </Link>
              <Link to="/mujer" className={styles.card}>
                <span className={styles.cardIcon}>👗</span>
                <h3>Ver Mujer</h3>
                <p>Catálogo femenino</p>
              </Link>
            </>
          ) : (
            <>
              <Link to="/tienda" className={styles.card}>
                <span className={styles.cardIcon}>🛍️</span>
                <h3>Catálogo de Productos</h3>
                <p>Ver productos disponibles</p>
              </Link>
              <Link to="/mis-pedidos" className={styles.card}>
                <span className={styles.cardIcon}>📦</span>
                <h3>Mis Pedidos</h3>
                <p>Ver historial de compras</p>
              </Link>
              <Link to="/mujer" className={styles.card}>
                <span className={styles.cardIcon}>👗</span>
                <h3>Catálogo Femenino</h3>
                <p>Colección exclusiva para mujer</p>
              </Link>
            </>
          )}
        </div>
      </section>

      {esAdmin && (
        <section className={styles.section}>
          <h2>Resumen de hoy</h2>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>--</span>
              <span className={styles.statLabel}>Pedidos hoy</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>--</span>
              <span className={styles.statLabel}>Productos</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>--</span>
              <span className={styles.statLabel}>Clientes</span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}