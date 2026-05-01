import { useState } from "react";
import styles from './Panel.module.css';

// Importa todos los CRUD
import ProveedoresCRUD from "../../server/crud/proveedores/components/ProveedoresCRUD";
import ProductosCRUD from "../../server/crud/productos/components/ProductosCRUD";
import AlmacenesCRUD from "../../server/crud/almacenes/components/AlmacenesCRUD";
import InventariosCRUD from "../../server/crud/inventarios/components/InventariosCRUD";
import PedidosCRUD from "../../server/crud/pedidos/components/PedidosCRUD";

export default function Panel() {
  const [activeCRUD, setActiveCRUD] = useState(null);

  const cruds = [
    { name: "Proveedores", component: <ProveedoresCRUD /> },
    { name: "Productos", component: <ProductosCRUD /> },
    { name: "Almacenes", component: <AlmacenesCRUD /> },
    { name: "Inventarios", component: <InventariosCRUD /> },
    { name: "Pedidos", component: <PedidosCRUD /> },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.welcomeSection}>
        <h1 className={styles.welcomeTitle}>Panel Administrativo</h1>
        <p className={styles.welcomeSubtitle}>Selecciona el CRUD que deseas administrar</p>
      </div>

      <div className={styles.cardsGrid}>
        {cruds.map(c => (
          <div
            key={c.name}
            className={styles.card}
            onClick={() => setActiveCRUD(c.name)}
          >
            <div className={styles.cardIcon}>
              {c.name === "Proveedores" && "📦"}
              {c.name === "Productos" && "👕"}
              {c.name === "Almacenes" && "🏭"}
              {c.name === "Inventarios" && "📊"}
              {c.name === "Pedidos" && "📋"}
            </div>
            <h3 className={styles.cardTitle}>{c.name}</h3>
            <p className={styles.cardDescription}>
              Gestionar {c.name.toLowerCase()}
            </p>
          </div>
        ))}
      </div>

      <div className={styles.contentSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {activeCRUD ? `Gestión de ${activeCRUD}` : "Selecciona una opción"}
          </h2>
          {activeCRUD && (
            <button className={styles.backBtn} onClick={() => setActiveCRUD(null)}>
              Volver al menú
            </button>
          )}
        </div>
        <div>
          {cruds.find(c => c.name === activeCRUD)?.component || 
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>📋</div>
              <h3 className={styles.emptyStateTitle}>Selecciona un CRUD</h3>
              <p className={styles.emptyStateMessage}>
                Elige una de las opciones del menú para comenzar a administrar
              </p>
            </div>
          }
        </div>
      </div>
    </div>
  );
}