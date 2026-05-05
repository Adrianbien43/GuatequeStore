import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Panel from "./Panel";

// Mock con Vitest
vi.mock("../../server/crud/proveedores/components/ProveedoresCRUD", () => ({
  default: () => <div>Proveedores Component</div>,
}));

vi.mock("../../server/crud/productos/components/ProductosCRUD", () => ({
  default: () => <div>Productos Component</div>,
}));

vi.mock("../../server/crud/almacenes/components/AlmacenesCRUD", () => ({
  default: () => <div>Almacenes Component</div>,
}));

vi.mock("../../server/crud/inventarios/components/InventariosCRUD", () => ({
  default: () => <div>Inventarios Component</div>,
}));

vi.mock("../../server/crud/pedidos/components/PedidosCRUD", () => ({
  default: () => <div>Pedidos Component</div>,
}));

describe("Componente Panel", () => {
  
  // Mock del contexto de autenticación
  const mockContext = {
    user: {
      id: 1,
      nombre: "Admin",
      email: "admin@test.com",
      rol: "ADMINISTRADOR"
    },
    logout: vi.fn()
  };

  // Función para renderizar Panel con el contexto
  const renderPanel = () => {
    return render(
      <BrowserRouter>
        <AuthContext.Provider value={mockContext}>
          <Panel />
        </AuthContext.Provider>
      </BrowserRouter>
    );
  };

  test("muestra mensaje inicial", () => {
    renderPanel();
    expect(screen.getByText(/Selecciona una sección para comenzar a gestionar/i)).toBeInTheDocument();
  });

  test("cambia el contenido al hacer click en Productos", () => {
    renderPanel();

    // ✅ CORREGIDO: Selecciona el elemento específico del menú lateral
    // Opción 1: Usar getAllByText y elegir el primero (el del menú)
    const productosElements = screen.getAllByText(/Productos/i);
    // El elemento del menú lateral es el que está dentro de .sidebar
    const menuProductos = productosElements.find(el => 
      el.closest('.sidebar_a575a7') || el.closest('._sidebar_a575a7')
    );
    
    fireEvent.click(menuProductos || productosElements[0]);

    expect(screen.getByText("Productos Component")).toBeInTheDocument();
  });

});