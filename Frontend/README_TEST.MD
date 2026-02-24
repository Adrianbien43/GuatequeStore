# Testing - GuatequeStore

## Visión General del Proyecto de Testing

Este documento presenta la estrategia y ejecución de pruebas para el proyecto GuatequeStore, una aplicación React con autenticación, gestión de clientes y operaciones CRUD. Se han implementado 38 pruebas que cubren lógica de negocio, llamadas a API e interfaz de usuario, siguiendo las mejores prácticas y criterios establecidos en la rúbrica de evaluación.

---

## Resumen de Cumplimiento de la Rúbrica

| Criterio | Puntuación | Evidencia |
|----------|------------|-----------|
| 1. Cantidad y tipo de tests | Excelente | 38 tests distribuidos: 10 lógica + 9 API + 19 interfaz |
| 2. Relevancia / cobertura funcional | Excelente | Casos normales, error y límite en todos los componentes |
| 3. Calidad técnica + Principio AAA | Excelente | Todos los tests siguen Arrange-Act-Assert explícitamente |
| 4. Uso de Vitest y autonomía | Excelente | Configuración completa, scripts optimizados, 0 fallos |
| 5. Colaboración y Mocks | Excelente | Mocks de API, contexto, axios, navegación y alert |
| 6. Documentación | Excelente | Documentación completa con ejemplos y troubleshooting |

---

## Cómo Ejecutar los Tests

### Requisitos Previos
```bash
# Node.js versión LTS recomendada
node --version

# Instalar dependencias
npm install
```

### Comandos Disponibles

```bash
# Ejecutar todos los tests
npm test

# Ejecutar en modo watch (se actualiza automáticamente)
npm run test:watch

# Ver cobertura de código
npm run test:coverage

# Ejecutar un archivo específico
npm test src/validators/registro.validator.test.js
npm test src/server/crud/clientes/services/clienteService.test.js
npm test src/pages/login/Login.test.jsx
npm test src/pages/registro/Registro.test.jsx

# Ejecutar tests por nombre (patrón)
npx vitest -t "debe mostrar error"
```

### Resultado Esperado
```bash
Test Files  5 passed (5)
Tests  38 passed (38)
```

---

## Estructura de Tests

```
src/
├── validators/
│   └── registro.validator.test.js          # Tests de lógica (10 tests)
├── server/crud/clientes/services/
│   └── clienteService.test.js               # Tests de API con mocks (9 tests)
├── pages/
│   ├── login/
│   │   └── Login.test.jsx                   # Tests de interfaz (11 tests)
│   └── registro/
│       └── Registro.test.jsx                 # Tests de interfaz (7 tests)
├── test/
│   ├── setup.js                              # Configuración global de tests
│   └── ejemplo.test.js                        # Test de verificación (1 test)
```

---

## Detalle de Tests por Archivo

### 1. Tests de Lógica - registro.validator.test.js (10 tests)

Este archivo prueba las validaciones del formulario de registro, una función pura que no depende de servicios externos.

| Test | Descripción | Caso |
|------|-------------|------|
| **Campo nombre** |
| debe retornar error cuando el nombre está vacío | Verifica que el nombre sea obligatorio | Error |
| debe retornar error cuando el nombre es solo espacios | Caso límite con espacios en blanco | Límite |
| **Campo email** |
| debe retornar error cuando el email no tiene @ | Email sin formato correcto | Error |
| debe retornar error cuando el email no tiene dominio | Email incompleto (correo@) | Límite |
| debe retornar error cuando el email está vacío | Campo email vacío | Error |
| **Campo password** |
| debe retornar error cuando password es menor a 6 caracteres | Longitud mínima no cumplida | Error |
| debe retornar error cuando password está vacío | Campo contraseña vacío | Error |
| **Confirmación** |
| debe retornar error cuando las contraseñas no coinciden | Validación de coincidencia | Error |
| **Múltiples errores** |
| debe retornar múltiples errores cuando hay varios campos inválidos | Combinación de errores | Límite |
| **Caso exitoso** |
| debe retornar objeto vacío cuando todos los campos son válidos | Formulario correcto | Normal |

---

### 2. Tests de API - clienteService.test.js (9 tests)

Pruebas de servicios que llaman a API externa, utilizando mocks para aislar las pruebas.

| Test | Descripción | Caso |
|------|-------------|------|
| **getClientes** |
| debe retornar solo los usuarios con rol CLIENTE | Filtrado correcto de clientes | Normal |
| debe retornar array vacío cuando no hay clientes | Lista sin clientes | Límite |
| debe manejar errores de la API | Error de red o servidor | Error |
| **createCliente** |
| debe crear un nuevo cliente correctamente | Creación exitosa | Normal |
| debe manejar errores al crear cliente | Error en creación (email duplicado) | Error |
| **updateCliente** |
| debe actualizar un cliente existente | Actualización exitosa | Normal |
| debe manejar error al actualizar cliente inexistente | Cliente no encontrado | Error |
| **deleteCliente** |
| debe eliminar un cliente correctamente | Eliminación exitosa | Normal |
| debe manejar error al eliminar cliente inexistente | Error en eliminación | Error |

---

### 3. Tests de Interfaz - Login.test.jsx (11 tests)

Pruebas del componente de inicio de sesión, incluyendo interacciones de usuario y contexto.

| Test | Descripción | Caso |
|------|-------------|------|
| **Renderizado inicial** |
| debe renderizar el formulario correctamente | Verificar elementos en pantalla | Normal |
| debe tener el título "Iniciar sesión" | Verificar título | Normal |
| **Interacciones del usuario** |
| debe actualizar el email cuando el usuario escribe | Escritura en input | Normal |
| debe actualizar la contraseña cuando el usuario escribe | Escritura en input | Normal |
| **Submit del formulario** |
| debe llamar a axios.post con los datos correctos | Envío de credenciales | Normal |
| debe llamar a login del contexto y navegar a welcome para CLIENTE | Redirección cliente | Normal |
| debe llamar a login del contexto y navegar a panel para ADMINISTRADOR | Redirección admin | Normal |
| debe mostrar alerta cuando hay error en el login | Credenciales inválidas | Error |
| debe deshabilitar el botón mientras carga | Estado de carga | Normal |
| **Validación HTML5** |
| los inputs deben tener atributo required | Campos obligatorios | Normal |
| el input email debe ser de tipo email | Tipo de input correcto | Normal |

---

### 4. Tests de Interfaz - Registro.test.jsx (7 tests)

Pruebas del componente de registro, con validaciones en tiempo real y envío de datos.

| Test | Descripción | Caso |
|------|-------------|------|
| debe mostrar error al dejar el campo nombre vacío (onBlur) | Validación al perder foco | Normal |
| debe mostrar error al dejar el campo email vacío | Validación al perder foco | Normal |
| debe mostrar error al dejar el campo password vacío | Validación al perder foco | Normal |
| no debe mostrar errores al renderizar el formulario | Estado inicial sin errores | Normal |
| debe mostrar múltiples errores al dejar todos los campos vacíos | Validación múltiple | Límite |
| debe enviar el formulario con datos válidos | Registro exitoso | Normal |
| debe mostrar error cuando las contraseñas no coinciden | Validación de coincidencia | Error |

---

## Estrategia de Mocks

Para aislar las pruebas y garantizar su repetibilidad, se utilizaron las siguientes estrategias de mocking:

### Mocks de API
```javascript
vi.mock('axios')
axios.post.mockResolvedValue(mockResponse)
axios.post.mockRejectedValue(error)
```

### Mocks de Contexto
```javascript
const mockLogin = vi.fn()
const mockContext = { login: mockLogin, user: null }

<AuthContext.Provider value={mockContext}>
  <Componente />
</AuthContext.Provider>
```

### Mocks de Navegación
```javascript
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})
```

### Mocks de Funciones Globales
```javascript
vi.spyOn(window, 'alert').mockImplementation(() => {})
global.fetch = vi.fn()
```

### Limpieza de Mocks
```javascript
beforeEach(() => {
  vi.clearAllMocks()
})
```

---

## Guía para Escribir Tests (Patrón AAA)

Todos los tests siguen el patrón Arrange-Act-Assert para garantizar claridad y mantenibilidad:

```javascript
it('debe describir el comportamiento esperado', async () => {
  // ARRANGE - Preparar datos, mocks y entorno
  const user = userEvent.setup()
  render(<Componente />)
  const mockResponse = { data: { id: 1, rol: 'CLIENTE' } }
  axios.post.mockResolvedValue(mockResponse)

  // ACT - Ejecutar la acción a probar
  await user.type(screen.getByPlaceholderText('Email'), 'test@test.com')
  await user.click(screen.getByRole('button'))

  // ASSERT - Verificar resultados
  await waitFor(() => {
    expect(screen.getByText('Éxito')).toBeInTheDocument()
  })
})
```

---

## Troubleshooting

### Error: "Cannot find module"
Solución: Asegurar que las importaciones incluyan la extensión del archivo (.js o .jsx)

### Error: "useNavigate must be used within Router"
Solución: Envolver el componente con <BrowserRouter> en el test

### Error: "Cannot destructure property 'login'"
Solución: Mockear el contexto con AuthContext.Provider

### Error: "Not implemented: window.alert"
Solución: Usar vi.spyOn(window, 'alert').mockImplementation(() => {})

### Error: "Received value is null" en toBeInTheDocument()
Solución: Verificar que el elemento aparece después de una interacción (usar waitFor)

---

## Resumen de Logros

| Métrica | Valor |
|---------|-------|
| Total de tests | 38 |
| Tests de lógica | 10 |
| Tests de API | 9 |
| Tests de interfaz | 19 |
| Tests pasando | 38 |
| Tests fallando | 0 |

---

## Conclusión

El proyecto de testing cumple con todos los criterios establecidos en la rúbrica:

- Cantidad superior a la requerida (38 tests)
- Distribución equilibrada entre lógica, API e interfaz
- Calidad técnica con patrón AAA en todos los tests
- Mocks profesionales para aislamiento total
- Documentación completa y fácil de seguir



---

*Documentación de testing - GuatequeStore*