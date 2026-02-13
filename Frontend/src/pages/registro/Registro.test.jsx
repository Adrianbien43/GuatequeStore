import { render, screen, fireEvent } from "@testing-library/react";
import Registro from "./Registro";

test("muestra errores al enviar el formulario vacío", () => {
  render(<Registro />);
  fireEvent.click(screen.getByText("Registrarse"));
  expect(
    screen.getByText("El nombre es obligatorio")
  ).toBeInTheDocument();
});
