import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Inicio from "./Inicio";

describe("Componente Inicio", () => {

  test("renderiza el título principal", () => {
    render(<Inicio />);
    
    const titulo = screen.getByRole("heading", { name: /bienvenidos/i });
    expect(titulo).toBeInTheDocument();
  });

  test("muestra el eslogan principal", () => {
    render(<Inicio />);
    
    const texto = screen.getByText(/viste bien todos los días/i);
    expect(texto).toBeInTheDocument();
  });

  test("renderiza botones 'Ver más'", () => {
    render(<Inicio />);
    
    const botones = screen.getAllByRole("button", { name: /ver más/i });
    expect(botones.length).toBeGreaterThan(0);
  });

});