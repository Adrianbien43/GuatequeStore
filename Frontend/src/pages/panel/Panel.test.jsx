import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
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

  test("muestra mensaje inicial", () => {
    render(<Panel />);
    expect(screen.getByText(/selecciona un crud/i)).toBeInTheDocument();
  });

  test("cambia el contenido al hacer click", () => {
    render(<Panel />);

    fireEvent.click(screen.getByRole("button", { name: /productos/i }));

    expect(screen.getByText("Productos Component")).toBeInTheDocument();
  });

});