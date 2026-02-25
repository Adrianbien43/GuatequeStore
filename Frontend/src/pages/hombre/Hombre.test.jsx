import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Hombre from "./Hombre";


// Agrupamos los tests del componente Hombre
describe("Componente Hombre", () => {

  test("renderiza los títulos de las temporadas", () => {

    render(<Hombre />);

    // Buscamos cada título por su texto
    const primavera = screen.getByRole("heading", { name: /primavera hombre/i });
    const verano = screen.getByRole("heading", { name: /verano hombre/i });
    const otono = screen.getByRole("heading", { name: /otoño hombre/i });
    const invierno = screen.getByRole("heading", { name: /invierno hombre/i });

    // Verificamos que todos existen en el documento
    expect(primavera).toBeInTheDocument();
    expect(verano).toBeInTheDocument();
    expect(otono).toBeInTheDocument();
    expect(invierno).toBeInTheDocument();
  });


  // Comprobar para ver que hay 4 botones con el texto "ver"
  test("renderiza cuatro botones con texto 'ver'", () => {

    render(<Hombre />);

    // Como hay varios botones iguales usamos getAllByRole
    const botones = screen.getAllByRole("button", { name: /ver/i });

    // Verificamos que sean exactamente 4
    expect(botones).toHaveLength(4);
  });


  //Comprobar que aparece un texto descriptivo del footer
  test("muestra el texto descriptivo del invierno", () => {

    render(<Hombre />);

    // Buscamos un texto específico del último bloque
    const texto = screen.getByText(/prepárate para el frío/i);

    expect(texto).toBeInTheDocument();
  });

});