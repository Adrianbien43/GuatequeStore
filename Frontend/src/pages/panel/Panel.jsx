import { useState } from "react";
import AdminLayout from "../../components/structural/admin-layout/AdminLayout";
import ClientesCRUD from "../../server/crud/clientes/components/ClientesCRUD";
import ProveedoresCRUD from "../../server/crud/proveedores/components/ProveedoresCRUD";
import ProductosCRUD from "../../server/crud/productos/components/ProductosCRUD";
import AlmacenesCRUD from "../../server/crud/almacenes/components/AlmacenesCRUD";
import InventariosCRUD from "../../server/crud/inventarios/components/InventariosCRUD";
import PedidosCRUD from "../../server/crud/pedidos/components/PedidosCRUD";
import styles from './Panel.module.css';

const SECTIONS = [
  { key: "clientes",    icon: "👥", title: "Clientes",    description: "Gestiona los clientes registrados" },
  { key: "proveedores", icon: "🏭", title: "Proveedores", description: "Gestiona los proveedores del sistema" },
  { key: "productos",   icon: "📦", title: "Productos",   description: "Administra el catálogo de productos" },
  { key: "almacenes",   icon: "🏪", title: "Almacenes",   description: "Controla los almacenes disponibles" },
  { key: "inventarios", icon: "📋", title: "Inventarios", description: "Revisa y actualiza el inventario" },
  { key: "pedidos",     icon: "🛒", title: "Pedidos",     description: "Gestiona los pedidos realizados" },
];

export default function Panel() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "clientes":    return <ClientesCRUD />;
      case "proveedores": return <ProveedoresCRUD />;
      case "productos":   return <ProductosCRUD />;
      case "almacenes":   return <AlmacenesCRUD />;
      case "inventarios": return <InventariosCRUD />;
      case "pedidos":     return <PedidosCRUD />;
      default:
        return (
          <div className={styles.dashboardContent}>
            <div className={styles.welcomeSection}>
              <h1 className={styles.welcomeTitle}>Panel Administrativo</h1>
              <p className={styles.welcomeSubtitle}>
                Selecciona una sección para comenzar a gestionar
              </p>
            </div>

            <div className={styles.cardsGrid}>
              {SECTIONS.map(({ key, icon, title, description }) => (
                <div
                  key={key}
                  className={styles.card}
                  onClick={() => setActiveSection(key)}
                >
                  <div className={styles.cardIcon}>{icon}</div>
                  <h3 className={styles.cardTitle}>{title}</h3>
                  <p className={styles.cardDescription}>{description}</p>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <AdminLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      <div className={styles.dashboardContainer}>
        {renderContent()}
      </div>
    </AdminLayout>
  );
}