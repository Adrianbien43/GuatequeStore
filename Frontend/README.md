# GuatequeStore - Frontend

![Portada GuatequeStore](../imagen/GuatequeStore.png)

GuatequeStore es la interfaz de cliente y administración de una plataforma de comercio electrónico enfocada en moda sostenible. En este README describimos el alcance real del proyecto, las decisiones técnicas, los criterios de calidad y los resultados que hemos alcanzado tras corregir la primera entrega.

## Descripción del proyecto

Nuestro frontend está desarrollado con React, Vite y Material-UI. Ofrece una experiencia de usuario fluida, accesible y coherente tanto para visitantes como para clientes autenticados y administradores.

Para visitantes no autenticados, la aplicación muestra un escaparate público de inspiración con colecciones por temporada, sin precios ni tallas. Solo los clientes autenticados acceden al catálogo real con precios, tallas, marcas e imágenes.

Hemos trabajado para que la aplicación sea clara desde el primer uso: navegación sencilla, retroalimentación inmediata, validaciones robustas y un flujo de pedido directo ágil. Además, el panel administrativo permite gestionar productos, proveedores e inventario con seguridad basada en roles.

### Propósito principal

Construir una solución de comercio electrónico completa que funcione sin fricciones y que sea fácil de mantener.

Nos planteamos un producto que cubriera tanto las necesidades del comprador como las de un gestor de tienda, sin sobrecargar la arquitectura.

### Público objetivo

- Clientes autenticados que acceden al catálogo real con precios, tallas, marcas e imágenes.
- Visitantes que solo ven un escaparate público de inspiración y colecciones por temporada sin precios.
- Administradores que requieren un panel con CRUD de productos, gestión de proveedores e inventario.
- Usuarios móviles y de escritorio que valoran una interfaz responsiva y accesible.

### Despliegue

Desplegado en: https://guateque.yarcrasy.com/

En este momento, el frontend también se puede probar localmente con `npm run dev`.

## Tabla de contenidos

- [Estado del proyecto](#estado-del-proyecto)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Arquitectura y diseño](#arquitectura-y-diseño)
- [Instalación](#instalación)
- [Variables de entorno](#variables-de-entorno)
- [Diseño y experiencia de usuario](#diseño-y-experiencia-de-usuario)
- [Accesibilidad](#accesibilidad)
- [Autenticación y seguridad](#autenticación-y-seguridad)
- [Testing](#testing)
- [Endpoints de API](#endpoints-de-api)
- [Limitaciones conocidas](#limitaciones-conocidas)
- [Lecciones aprendidas](#lecciones-aprendidas)
- [Autor y contacto](#autor-y-contacto)

## Estado del proyecto

### Funcionalidades implementadas

| Módulo | Funcionalidad | Estado |
|--------|--------------|--------|
| Autenticación | Registro con validación completa | Implementado |
| Autenticación | Login con JWT | Implementado |
| Autenticación | Gestión de sesión y logout | Implementado |
| Autenticación | Protección de rutas por rol | Implementado |
| Cliente | Catálogo filtrable por género | Implementado |
| Cliente | Búsqueda y filtrado de productos | Implementado |
| Visitante | Escaparate público para visitantes | Implementado |
| Cliente | Pedido directo de productos (sin carrito) | Implementado |
| Cliente | Visualización de líneas de pedido en historial | Implementado |
| Cliente | Historial de pedidos | Implementado |
| Cliente | Programa de reciclaje | Implementado |
| Admin | Panel de control con métricas | Implementado |
| Admin | CRUD completo de productos | Implementado |
| Admin | Gestión de proveedores | Implementado |
| Admin | Control de inventario | Implementado |
| Técnicas | Diseño responsive mobile-first | Implementado |
| Técnicas | Testing automatizado con Vitest | Implementado |
| Técnicas | Build optimizado con Vite | Implementado |

### Correcciones desde la primera entrega

Hemos aplicado mejoras concretas a partir del feedback recogido en la primera entrega:

- El modelo de pedido directo ofrecido por el proyecto se ajusta a la necesidad real de agilidad del grupo musical, evitando la complejidad de un carrito tradicional.
- La experiencia de los formularios no ofrecía suficiente feedback. Hemos añadido estados de carga, mensajes de error claros y alertas de éxito con MUI.
- El responsive se rompía en tablets. Ajustamos los breakpoints y el escalado tipográfico para mantener consistencia en `sm`, `md` y `lg`.
- Los tests iniciales no cubrían las validaciones clave. Añadimos pruebas de `registro.validator.js` con casos límite y errores esperados.
- El panel administrativo no mostraba correctamente filtros de stock bajo. Implementamos la vista y el endpoint correspondiente.

### Mejoras adicionales

- Refinamos la navegación interna para que las rutas protegidas se comporten sin redirecciones inesperadas.
- Consolidamos componentes reutilizables para reducir duplicación y mejorar la mantenibilidad.
- Añadimos interceptores de Axios para gestión automática de tokens y manejo centralizado de errores 401.
- Mejoramos el control de acceso por roles para evitar que componentes administrativos sean accesibles a usuarios sin permisos.
- Al consultar un pedido en el historial del cliente, mostramos sus líneas de pedido con productos, cantidades y precios históricos.

## Tecnologías utilizadas

| Capa | Tecnología | Uso |
|------|-----------|-----|
| Core | React 19.2.0 | Interfaz declarativa y hooks |
| Core | Vite 7.2.4 | Build y desarrollo rápido |
| Core | React Router DOM 6.30.3 | Enrutamiento y protección de rutas |
| UI | Material-UI (MUI) 7.3.7 | Componentes accesibles y consistentes |
| UI | Emotion | Estilos dinámicos y temas |
| HTTP | Axios 1.13.5 | Interceptores, gestión de JWT y peticiones |
| Testing | Vitest 4.0.18 | Pruebas unitarias y de integración |
| Testing | React Testing Library 16.3.2 | Pruebas de componentes orientadas al comportamiento |
| Calidad | ESLint 9.39.1 | Consistencia de código |

## Arquitectura y diseño

### Capas del proyecto

- Presentación: componentes y páginas.
- Lógica: hooks, validadores y contexto.
- Comunicación: servicios API y manejo de tokens.
- Persistencia: `localStorage` para token de sesión y datos de usuario.

### Decisiones técnicas

En la gestión de estado global valoramos Redux y Zustand, pero elegimos Context API porque el estado no es excesivamente complejo y queríamos evitar sobreingeniería.

- Context API: suficiente para auth y sesión, con bajo coste de mantenimiento.
- Vite: elegido por su tiempo de arranque y build optimizado.
- MUI: elegido por la accesibilidad de sus componentes y el soporte para temas.
- Axios: elegido por los interceptores, la capacidad de centralizar headers y el manejo de errores.

### Estructura de carpetas

```
Frontend/
├── src/
│   ├── main.jsx                 # Punto de entrada
│   ├── App.jsx                  # Router principal
│   ├── api.js                   # Axios configurado con interceptores
│   ├── index.css                # Estilos globales
│   ├── assets/                  # Recursos estáticos (imágenes, fuentes)
│   ├── components/
│   │   ├── reusable/            # Componentes reutilizables
│   │   │   ├── ConfirmDialog.jsx
│   │   │   ├── ConfirmDialog.module.css
│   │   │   ├── Table.jsx
│   │   │   ├── Table.module.css
│   │   │   └── index.js
│   │   └── structural/          # Componentes estructurales
│   │       ├── admin-layout/
│   │       │   ├── AdminLayout.jsx
│   │       │   ├── AdminLayout.module.css
│   │       │   ├── Sidebar.jsx
│   │       │   ├── TopBar.jsx
│   │       │   └── index.js
│   │       ├── cargando/        # Componente de carga
│   │       ├── error/           # ErrorBoundary y estilos
│   │       │   ├── ErrorBoundary.jsx
│   │       │   ├── ErrorBoundary.module.css
│   │       │   └── ErrorBoundary.test.jsx
│   │       ├── footer/          # Pie de página
│   │       │   ├── Footer.jsx
│   │       │   └── Footer.module.css
│   │       ├── header/          # Cabecera y navegación
│   │       │   ├── Header.jsx
│   │       │   └── Header.module.css
│   │       ├── main/            # Layout principal
│   │       │   ├── Main.jsx
│   │       │   └── Main.module.css
│   │       └── PrivateRoute.jsx # Guard de rutas por rol
│   ├── context/
│   │   ├── AuthContext.jsx      # Estado global de autenticación
│   │   └── AuthContext.test.jsx
│   ├── pages/
│   │   ├── inicio/              # Landing pública
│   │   │   ├── Inicio.jsx
│   │   │   ├── Inicio.module.css
│   │   │   └── Inicio.test.jsx
│   │   ├── login/               # Formulario de login
│   │   │   ├── Login.jsx
│   │   │   ├── Login.module.css
│   │   │   └── Login.test.jsx
│   │   ├── registro/            # Formulario de registro
│   │   │   ├── Registro.jsx
│   │   │   ├── Registro.module.css
│   │   │   └── Registro.test.jsx
│   │   ├── hombre/              # Catálogo hombre (escaparate)
│   │   │   ├── Hombre.jsx
│   │   │   ├── Hombre.module.css
│   │   │   └── Hombre.test.jsx
│   │   ├── mujer/               # Catálogo mujer (escaparate)
│   │   │   ├── Mujer.jsx
│   │   │   ├── Mujer.module.css
│   │   │   └── Mujer.test.jsx
│   │   ├── welcome/             # Panel del cliente autenticado
│   │   │   ├── WelcomeClient.jsx
│   │   │   └── WelcomeClient.module.css
│   │   ├── cliente/             # Secciones del cliente
│   │   │   ├── ClientProductos.jsx
│   │   │   ├── ClientProductos.module.css
│   │   │   ├── MisPedidos.jsx
│   │   │   └── MisPedidos.module.css
│   │   └── panel/               # Dashboard administrativo
│   │       ├── Panel.jsx
│   │       ├── Panel.module.css
│   │       └── Panel.test.jsx
│   ├── server/
│   │   └── crud/                # Servicios de API por entidad
│   │       ├── almacenes/
│   │       │   ├── components/
│   │       │   │   └── AlmacenesCRUD.jsx
│   │       │   ├── hooks/
│   │       │   │   └── useAlmacenes.js
│   │       │   └── services/
│   │       │       └── almacenService.js
│   │       ├── clientes/
│   │       │   ├── components/
│   │       │   │   └── ClientesCRUD.jsx
│   │       │   ├── hooks/
│   │       │   │   └── useClientes.js
│   │       │   └── services/
│   │       │       ├── clienteService.js
│   │       │       └── clienteService.test.js
│   │       ├── inventarios/
│   │       │   ├── components/
│   │       │   │   └── InventariosCRUD.jsx
│   │       │   ├── hooks/
│   │       │   │   └── useInventarios.js
│   │       │   └── services/
│   │       │       └── inventarioService.js
│   │       ├── pedidos/
│   │       │   ├── components/
│   │       │   │   └── PedidosCRUD.jsx
│   │       │   ├── hooks/
│   │       │   │   ├── usePedidos.js
│   │       │   │   └── useClientPedidos.js
│   │       │   └── services/
│   │       │       ├── pedidoService.js
│   │       │       └── clientePedidoService.js
│   │       ├── productos/
│   │       │   ├── components/
│   │       │   │   └── ProductosCRUD.jsx
│   │       │   ├── hooks/
│   │       │   │   ├── useProductos.js
│   │       │   │   └── useClientProductos.js
│   │       │   └── services/
│   │       │       ├── productoService.js
│   │       │       └── clienteProductoService.js
│   │       └── proveedores/
│   │           ├── components/
│   │           │   └── ProveedoresCRUD.jsx
│   │           ├── hooks/
│   │           │   └── useProveedores.js
│   │           └── services/
│   │               └── proveedorService.js
│   ├── test/
│   │   ├── setup.js             # Configuración de Vitest
│   │   └── ejemplo.test.js      # Test de verificación
│   └── validators/
│       ├── registro.validator.js         # Validaciones de registro
│       └── registro.validator.test.js    # Tests de validaciones
├── package.json
├── vite.config.js
├── eslint.config.js
└── .env
```

## Instalación

### Requisitos previos

- Node.js 18.x o superior.
- Backend en ejecución en `http://localhost:8080`.

### Pasos

1. Clonar el repositorio.
2. Navegar a `GuatequeStore/Frontend`.
3. Ejecutar `npm install`.
4. Copiar el archivo de ejemplo de variables de entorno con `cp .env.example .env`.
5. Ejecutar `npm run dev`.

### Comandos disponibles

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera la build de producción.
- `npm run preview`: sirve la build de producción.
- `npm run test`: ejecuta las pruebas unitarias.
- `npm run test:coverage`: genera el reporte de cobertura.
- `npm run lint`: ejecuta ESLint.

## Variables de entorno

Las variables necesarias son:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_JWT_STORAGE_KEY=token
VITE_USER_STORAGE_KEY=user
```

Estas variables controlan la URL de la API y las claves de almacenamiento local.

## Diseño y experiencia de usuario

### Intención de diseño

A la hora de elegir la paleta de colores, pensamos en transmitir cercanía y confianza. Descartamos tonos demasiado agresivos o saturados. Elegimos una gama basada en verdes suaves y acentos neutros para reforzar la idea de sostenibilidad y crecimiento.

La tipografía se definió para que el contenido sea fácil de leer y para que los bloques de información se distingan con claridad. Se utilizaron tamaños escalables para mejorar la lectura en móviles y tablets.

![Diseños de interfaz](../imagen/diseños.png)

![Paleta de colores](../imagen/colores.png)

### Breakpoints responsive

| Nombre | Min-width | Uso típico |
|--------|-----------|------------|
| xs | 0px | Móvil portrait |
| sm | 600px | Móvil landscape |
| md | 960px | Tablet |
| lg | 1280px | Desktop |
| xl | 1920px | Monitor grande |

### Usabilidad

- La navegación es clara: se accede fácilmente a catálogo, login, registro y panel administrativo.
- Los formularios muestran errores específicos y estados de carga.
- El modelo de pedido directo es ágil y evita la complejidad de un carrito tradicional.
- Los mensajes de acción son directos y no dejan duda sobre el resultado.

### Atención al detalle

- Hemos mantenido una consistencia visual en botones, tarjetas y formularios.
- Las etiquetas son claras y los placeholders son descriptivos.
- Las rutas protegidas evitan accesos no autorizados sin generar saltos bruscos.

## Accesibilidad

### Cumplimiento WCAG 2.1 AA

Hemos verificado los principales puntos de accesibilidad:

- Uso de HTML semántico con `header`, `nav`, `main` y `footer`.
- Etiquetas asociadas a todos los campos de formulario.
- Textos alternativos en imágenes de producto.
- Contraste suficiente en botones y textos.
- Navegación completa con teclado.
- Indicadores de foco visibles.

## Autenticación y seguridad

### Flujo JWT

1. El usuario inicia sesión en `/api/auth/login`.
2. El backend devuelve un token JWT.
3. Guardamos el token en `localStorage` y en el contexto de autenticación.
4. Cada petición incluye `Authorization: Bearer <token>`.
5. Si el token expira, el interceptor de Axios fuerza el cierre de sesión.

### Roles y rutas protegidas

El frontend distingue entre clientes y administradores:

- Rutas de cliente disponibles para el rol `CLIENTE`.
- Rutas administrativas disponibles para el rol `ADMINISTRADOR`.

La protección se implementa en `PrivateRoute.jsx`, que evalúa el rol del usuario antes de permitir el acceso.

## Testing

### Qué hemos testeado

- Validaciones del formulario de registro con `registro.validator.js`.
- Comportamiento de los componentes de autenticación y acceso restringido.
- Persistencia de la sesión de usuario y recuperación de datos con `localStorage`.
- Interceptores de Axios para el manejo de tokens y errores.

### Por qué la cobertura es suficiente

Hemos cubierto las rutas críticas de la aplicación y los casos de error más relevantes. La prioridad fue asegurar que el flujo de login, registro, pedido directo y panel administrativo funcionen sin fallos.

### Ejecución

- `npm run test`: ejecuta las pruebas unitarias.
- `npm run test:coverage`: genera el reporte de cobertura.

## Endpoints de API

### Base URL

- Desarrollo local: `http://localhost:8080/api`

### Autenticación

- `POST /api/auth/login`: inicio de sesión.
- `POST /api/auth/register`: registro de usuario.
- `POST /api/auth/validate`: validación del token.

### Productos

- `GET /api/productos`: lista de productos.
- `GET /api/productos/{id}`: detalle de producto.
- `POST /api/productos`: crear producto (ADMIN).
- `PUT /api/productos/{id}`: actualizar producto (ADMIN).
- `DELETE /api/productos/{id}`: eliminar producto (ADMIN).

### Proveedores

- `GET /api/proveedores`: lista de proveedores.
- `GET /api/proveedores/{id}`: detalle de proveedor.
- `GET /api/proveedores/{id}/productos`: productos de proveedor.
- `POST /api/proveedores`: crear proveedor (ADMIN).
- `PUT /api/proveedores/{id}`: actualizar proveedor (ADMIN).
- `DELETE /api/proveedores/{id}`: eliminar proveedor (ADMIN).

### Inventario

- `GET /api/inventario`: lista de inventario (ADMIN).
- `GET /api/inventario/almacen/{almacenId}`: inventario por almacén (ADMIN).
- `GET /api/inventario/producto/{productoId}`: inventario por producto (ADMIN).
- `GET /api/inventario/bajo-stock/{limite}`: productos con stock bajo (ADMIN).
- `POST /api/inventario`: crear asociación producto-almacén (ADMIN).
- `PUT /api/inventario/almacen/{aId}/producto/{pId}`: actualizar cantidad (ADMIN).
- `POST /api/inventario/almacen/{aId}/producto/{pId}/incrementar`: añadir stock (ADMIN).
- `POST /api/inventario/almacen/{aId}/producto/{pId}/decrementar`: reducir stock (ADMIN).
- `DELETE /api/inventario/almacen/{aId}/producto/{pId}`: eliminar asociación (ADMIN).

### Pedidos

- `GET /api/pedidos`: lista todos los pedidos (ADMIN).
- `GET /api/pedidos/{id}`: detalle de pedido.
- `GET /api/pedidos/cliente/{usuarioId}`: pedidos del cliente.
- `POST /api/pedidos`: crear pedido (CLIENTE).
- `PUT /api/pedidos/{id}`: actualizar estado (ADMIN).
- `DELETE /api/pedidos/{id}`: eliminar pedido (ADMIN).

### Usuarios

- `GET /api/usuarios`: lista de usuarios (ADMIN).
- `GET /api/usuarios/{id}`: detalle de usuario.
- `POST /api/usuarios`: crear usuario (ADMIN).
- `PUT /api/usuarios/{id}`: actualizar usuario (ADMIN).
- `DELETE /api/usuarios/{id}`: eliminar usuario (ADMIN).

### Estado HTTP relevantes

- `200 OK`: petición correcta.
- `201 CREATED`: recurso creado.
- `204 NO CONTENT`: eliminación correcta.
- `400 BAD REQUEST`: datos inválidos.
- `401 UNAUTHORIZED`: falta token o token inválido.
- `403 FORBIDDEN`: rol insuficiente.
- `404 NOT FOUND`: recurso inexistente.

## Limitaciones conocidas

- El modelo de compra directa no utiliza carrito: el cliente selecciona un producto, indica la cantidad y confirma el pedido en el mismo momento.
- No hay pasarela de pago integrada. Los pedidos se registran como `PENDIENTE` y el administrador contacta al cliente por correo para tramitar el pago de forma externa.
- La búsqueda funciona por nombre de producto; no se ha extendido a descripción ni etiquetas.

## Lecciones aprendidas

En este proyecto hemos aprendido a priorizar la mantenibilidad sin perder funcionalidad. Lo que más nos costó fue decidir el nivel de abstracción adecuado: no queríamos un frontend demasiado rígido ni un código excesivamente complejo.

Si volviéramos a empezar, dedicaríamos más tiempo al diseño del estado global y a la estrategia de manejo de datos, para tener las reglas de negocio más claras desde el primer sprint.

Estamos especialmente orgullosos de haber cerrado las principales deficiencias de la primera entrega: el feedback de formularios, la accesibilidad en tablas y formularios, y el soporte completo del modelo de pedido directo.

## Autor y contacto

**Desarrollado por**: Adrián Bienvenido y Gorka Jesús

- Adrián: adrianbienvenidomoralesperdomo@alumno.ieselrincon.es
- Gorka: gorkajesusquesadavega@alumno.ieselrincon.es

Repositorio: https://github.com/Adrianbien43/GuatequeStore

Diseño de referencia: https://www.figma.com/design/vbEG6WmzHaxsk2JROq9KnC/KORA-DESIGN
