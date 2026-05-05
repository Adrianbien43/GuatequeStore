import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Mujer from "./Mujer";

describe("Componente Mujer", () => {

  test("renderiza los títulos principales", () => {
    render(<Mujer />);

    // ✅ CORREGIDO: Buscar todos los títulos h2 (Moda Primavera, Verano, Otoño, Invierno)
    const titulos = screen.getAllByRole("heading", { level: 2 });
    
    expect(titulos).toHaveLength(4);
    expect(titulos[0]).toHaveTextContent(/Moda Primavera/i);
    expect(titulos[1]).toHaveTextContent(/Moda Verano/i);
    expect(titulos[2]).toHaveTextContent(/Moda Otoño/i);
    expect(titulos[3]).toHaveTextContent(/Moda Invierno/i);
  });

  test("renderiza cuatro botones", () => {
    render(<Mujer />);

    // ✅ CORREGIDO: Los botones tienen texto "primavera", "verano", "otoño", "invierno"
    // No tienen texto "uiverse"
    const botones = screen.getAllByRole("button");
    
    expect(botones).toHaveLength(4);
    
    // Opcional: verifica el texto de cada botón
    expect(botones[0]).toHaveTextContent(/primavera/i);
    expect(botones[1]).toHaveTextContent(/verano/i);
    expect(botones[2]).toHaveTextContent(/otoño/i);
    expect(botones[3]).toHaveTextContent(/invierno/i);
  });

  test("muestra el texto del footer", () => {
    render(<Mujer />);

    // ✅ CORREGIDO: Los textos reales de los footers son descripciones de cada temporada
    // No existe "explora la colección"
    const textos = screen.getAllByRole("paragraph");
    
    expect(textos).toHaveLength(4);
    
    // Verifica que contienen los textos descriptivos
    expect(textos[0]).toHaveTextContent(/Chaquetas finas, flores y tejidos cómodos/i);
    expect(textos[1]).toHaveTextContent(/El verano es libertad pura/i);
    expect(textos[2]).toHaveTextContent(/Las capas suaves y tonos cálidos/i);
    expect(textos[3]).toHaveTextContent(/Cada abrigo refleja tu fuerza/i);
  });

});