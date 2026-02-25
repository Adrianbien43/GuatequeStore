import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Mujer from "./Mujer";

describe("Componente Mujer", () => {

  test("renderiza los títulos principales", () => {
    render(<Mujer />);

    const titulos = screen.getAllByRole("heading", { name: /moda primavera/i });
    expect(titulos).toHaveLength(4);
  });

  test("renderiza cuatro botones con texto 'uiverse'", () => {
    render(<Mujer />);

    const botones = screen.getAllByRole("button", { name: /uiverse/i });
    expect(botones).toHaveLength(4);
  });

  test("muestra el texto del footer", () => {
    render(<Mujer />);

    const textos = screen.getAllByText(/explora la colección/i);
    expect(textos).toHaveLength(4);
  });

});