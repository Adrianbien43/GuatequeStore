import { validateRegistro } from "./registro.validator";

test("error si nombre está vacío", () => {
  const e = validateRegistro({});
  expect(e.nombre).toBeDefined();
});

test("error si email es inválido", () => {
  const e = validateRegistro({
    nombre: "Juan",
    email: "correo",
    password: "123456",
    confirm: "123456"
  });
  expect(e.email).toBe("Email inválido");
});

test("error si contraseñas no coinciden", () => {
  const e = validateRegistro({
    nombre: "Juan",
    email: "juan@mail.com",
    password: "123456",
    confirm: "654321"
  });
  expect(e.confirm).toBeDefined();
});

test("sin errores cuando todo es válido", () => {
  const e = validateRegistro({
    nombre: "Juan",
    email: "juan@mail.com",
    password: "123456",
    confirm: "123456"
  });
  expect(Object.keys(e)).toHaveLength(0);
});
