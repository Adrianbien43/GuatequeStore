import { useState } from "react";

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
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>Panel Administrativo</h1>
      <p>Selecciona el CRUD que deseas administrar:</p>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "30px" }}>
        {cruds.map(c => (
          <button
            key={c.name}
            onClick={() => setActiveCRUD(c.name)}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: activeCRUD === c.name ? "#4CAF50" : "#eee",
              color: activeCRUD === c.name ? "#fff" : "#000",
              border: "none",
              borderRadius: "5px"
            }}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
        {cruds.find(c => c.name === activeCRUD)?.component || <p>Selecciona un CRUD para mostrar.</p>}
      </div>
    </div>
  );
}
