import { useState } from "react";
import AdminLayout from "../../components/structural/admin-layout/AdminLayout";
import ProveedoresCRUD from "../../server/crud/proveedores/components/ProveedoresCRUD";
import ProductosCRUD from "../../server/crud/productos/components/ProductosCRUD";
import AlmacenesCRUD from "../../server/crud/almacenes/components/AlmacenesCRUD";
import InventariosCRUD from "../../server/crud/inventarios/components/InventariosCRUD";
import PedidosCRUD from "../../server/crud/pedidos/components/PedidosCRUD";

export default function Panel() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch(activeSection) {
      case "proveedores":
        return <ProveedoresCRUD />;
      case "productos":
        return <ProductosCRUD />;
      case "almacenes":
        return <AlmacenesCRUD />;
      case "inventarios":
        return <InventariosCRUD />;
      case "pedidos":
        return <PedidosCRUD />;
      default:
        return (
          <div>
            <h1>Dashboard</h1>
            <p>Bienvenido al panel administrativo</p>
          </div>
        );
    }
  };

  return (
    <AdminLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderContent()}
    </AdminLayout>
  );
}