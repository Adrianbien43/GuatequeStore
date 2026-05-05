import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Hombre from "./Hombre";

describe("Componente Hombre", () => {

  test("renderiza los títulos de las temporadas", () => {
    render(<Hombre />);

    // ✅ CORREGIDO: Los títulos reales son "Primavera Hombre", "Verano Hombre", etc.
    const primavera = screen.getByRole("heading", { name: /Primavera Hombre/i });
    const verano = screen.getByRole("heading", { name: /Verano Hombre/i });
    const otono = screen.getByRole("heading", { name: /Otoño Hombre/i });
    const invierno = screen.getByRole("heading", { name: /Invierno Hombre/i });

    expect(primavera).toBeInTheDocument();
    expect(verano).toBeInTheDocument();
    expect(otono).toBeInTheDocument();
    expect(invierno).toBeInTheDocument();
  });

  test("renderiza cuatro botones", () => {
    render(<Hombre />);

    // Los botones tienen texto "primavera", "verano", "otoño", "invierno"
    const botones = screen.getAllByRole("button");
    
    expect(botones).toHaveLength(4);
    
    // Verifica que cada botón tiene el texto esperado
    expect(botones[0]).toHaveTextContent(/primavera/i);
    expect(botones[1]).toHaveTextContent(/verano/i);
    expect(botones[2]).toHaveTextContent(/otoño/i);
    expect(botones[3]).toHaveTextContent(/invierno/i);
  });

  test("muestra el texto descriptivo del invierno", () => {
    render(<Hombre />);

    // ✅ CORREGIDO: El texto real del footer de invierno es "Prepárate para el frío"
    const texto = screen.getByText(/Prepárate para el frío/i);

    expect(texto).toBeInTheDocument();
  });

});