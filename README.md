---

# **GuatequeStore**

## Plataforma de Gestión y Venta de Productos de Moda

---

### **![Portada GuatequeStore](./imagen/GuatequeStore.png)**

---

## Introducción

GuatequeStore es una plataforma de e-commerce completa para la gestión y venta de productos de moda. Fue diseñada para que los clientes puedan explorar un catálogo variado, consultar disponibilidad de tallas y colores, gestionar un carrito de compras y completar pedidos de forma sencilla.

Además de la experiencia del cliente, la plataforma cuenta con herramientas internas para que los administradores mantengan el inventario actualizado, gestionen productos y proveedores, y optimicen la experiencia de compra en general.

Lo que hace única a GuatequeStore es su compromiso con la **moda responsable** y la **economía circular**. Todos nuestros productos provienen de proveedores que cumplen estándares ESG, y contamos con un programa de reciclaje donde los clientes pueden devolver prendas con recibo para obtener recompensas, cerrando el ciclo de vida del producto.

---

## Índice

1. [Descripción General](#descripción-general)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Tecnologías](#tecnologías)
4. [Empezar Rápido](#empezar-rápido)
5. [Cómo Funciona](#cómo-funciona)
6. [Funcionalidades Principales](#funcionalidades-principales)
7. [Arquitectura](#arquitectura)
8. [Base de Datos](#base-de-datos)
9. [Seguridad](#seguridad)
10. [APIs](#apis)
11. [Instalación Detallada](#instalación-detallada)
12. [Problemas Comunes](#problemas-comunes)
13. [Cómo Contribuir](#cómo-contribuir)

---

## Descripción General

GuatequeStore está compuesta por tres aplicaciones integradas:

- **Backend**: Un servidor Spring Boot que expone APIs REST
- **Frontend**: Una aplicación web hecha en React
- **Android**: Una aplicación móvil nativa

Las tres se comunican con una base de datos MySQL compartida, asegurando que los datos estén siempre sincronizados.

**¿Quiénes pueden usar GuatequeStore?**

- **Clientes normales**: Pueden registrarse, explorar productos, hacer compras y ver su historial
- **Administradores**: Tienen acceso a herramientas de gestión del inventario, productos y reportes

---

## Estructura del Proyecto

```
GuatequeStore/
│
├── Backend/           ← Servidor Spring Boot (Java 17)
│   ├── src/main/java/com/guatequestore/backend/
│   ├── build.gradle
│   └── gradle/
│
├── Frontend/          ← Aplicación web (React + Vite)
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── Android/           ← Aplicación móvil (Java)
    ├── app/
    ├── build.gradle.kts
    └── settings.gradle.kts
```

Cada carpeta es independiente pero trabajan en conjunto. El Backend es el corazón del sistema, mientras que Frontend y Android son los clientes.

---

## Tecnologías

**Backend:**
- Java 17
- Spring Boot 3.5.7
- MySQL 8.x
- JWT para autenticación
- Hibernate/JPA para la base de datos

**Frontend:**
- React 19.2
- Vite 7.2.4
- Material Design (MUI)
- Axios para llamadas HTTP
- React Router para navegación

**Android:**
- Java 11
- Gradle 8.x
- Retrofit 2.11.0 para APIs
- GSON para JSON

---

## Empezar Rápido

### Backend

```bash
cd Backend
./gradlew build
./gradlew bootRun
```

El servidor estará disponible en `http://localhost:8080`

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

La aplicación web estará en `http://localhost:5173`

### Android

Abre la carpeta `Android/` en Android Studio, sincroniza Gradle y presiona Run.

---

## Cómo Funciona

### Flujo de un Usuario Cliente

1. **Registro**: El usuario crea una cuenta con email y contraseña
2. **Login**: Se autentica y recibe un token JWT válido por 24 horas
3. **Exploración**: Navega por productos disponibles (Hombre/Mujer)
4. **Compra**: Agrega items al carrito, revisa disponibilidad de tallas/colores
5. **Checkout**: Completa la compra y se crea un pedido
6. **Historial**: Puede ver todos sus pedidos anteriores

### Flujo de un Administrador

1. Accede con credenciales de admin
2. Puede ver/crear/editar productos
3. Gestiona el inventario de cada almacén
4. Visualiza todos los pedidos del sistema
5. Genera reportes de ventas

**[INSERTAR DIAGRAMA DE FLUJOS]**

---

## Funcionalidades Principales

### Para Clientes

- Crear cuenta y gestionar perfil
- Explorar catálogo por categorías
- Buscar productos y filtrar por talla/color/precio
- Ver disponibilidad en tiempo real
- Carrito de compras persistente
- Hacer pedidos seguros
- Ver historial de compras
- Desactivar cuenta si lo desean

### Para Administradores

- Panel de control con métricas
- Gestión completa de productos
- Control de inventario por almacén
- Seguimiento de pedidos
- Gestión de proveedores
- Reportes de ventas y stock
- Alertas de bajo inventario

---

## Arquitectura

GuatequeStore sigue una arquitectura de **3 capas**:
![Portada GuatequeStore](./imagen/Arquitectura.png)

---

**¿Por qué esta arquitectura?**

Permite que el Frontend y Android usen las mismas APIs, lo que facilita la escalabilidad y el mantenimiento.

**[INSERTAR DIAGRAMA DE ARQUITECTURA]**

---

## Base de Datos

GuatequeStore usa MySQL con 7 tablas principales:

| Tabla | Propósito |
|---|---|
| **usuarios** | Almacena clientes y admins |
| **productos** | Catálogo de ropa |
| **inventario** | Stock disponible por talla/color |
| **pedidos** | Órdenes de compra |
| **lineas_pedido** | Items de cada pedido |
| **proveedores** | Datos de suministradores |
| **almacenes** | Ubicaciones de stock |

### Relaciones

- Un usuario puede tener **muchos pedidos**
- Un pedido contiene **muchos items** (líneas)
- Cada item corresponde a un **producto específico**
- Los productos vienen de **proveedores**
- El stock se distribuye en **almacenes**

**[INSERTAR DIAGRAMA ER]**

---

## Seguridad

### Autenticación

Usamos **JSON Web Tokens (JWT)** para autenticar a los usuarios. Cuando alguien hace login:

1. El Backend valida las credenciales
2. Si son correctas, genera un token JWT
3. El token tiene una duración de 24 horas
4. El cliente lo almacena localmente y lo incluye en cada request

### Autorización

Hay dos roles:

- **CLIENTE**: Acceso limitado a sus propios datos y productos
- **ADMINISTRADOR**: Acceso total al sistema

### Protecciones

- Contraseñas se guardan con **BCrypt** (nunca en texto plano)
- Requests se validan antes de procesarse
- CORS está configurado para controlar orígenes
- Los usuarios se pueden **desactivar** pero sus datos nunca se eliminan
- Las transacciones son **ACID** (todo o nada)

---

## APIs

### Autenticación

```
POST /api/auth/login        → Hacer login
POST /api/auth/register     → Crear cuenta
```

### Usuarios

```
GET    /api/usuarios/{id}              → Obtener perfil
PUT    /api/usuarios/{id}              → Actualizar datos
PUT    /api/usuarios/{id}/desactivar   → Desactivar cuenta
GET    /api/usuarios/{id}/pedidos      → Ver historial
```

### Productos

```
GET /api/productos                   → Listar productos
GET /api/productos/{id}              → Detalles de producto
GET /api/productos/{id}/inventario   → Stock disponible
```

### Pedidos

```
POST   /api/pedidos           → Crear pedido
GET    /api/pedidos/{id}      → Detalles del pedido
```

---

## Instalación Detallada

### Requisitos

- Java 17 o superior
- Node.js 18 o superior
- MySQL 8.x
- Git
- (Opcional) Android Studio para la app móvil

### Backend - Paso a Paso

```bash
# 1. Ir a la carpeta
cd Backend

# 2. Crear la base de datos
mysql -u root -p
CREATE DATABASE guateque_store;
EXIT;

# 3. Editar application.properties
nano src/main/resources/application-dev.properties

# Agregar:
spring.datasource.url=jdbc:mysql://localhost:3306/guateque_store
spring.datasource.username=root
spring.datasource.password=tu_password

# 4. Compilar
./gradlew clean build

# 5. Ejecutar
./gradlew bootRun
```

El backend estará en `http://localhost:8080`

### Frontend - Paso a Paso

```bash
# 1. Ir a la carpeta
cd Frontend

# 2. Instalar dependencias
npm install

# 3. Crear archivo de configuración
echo "VITE_API_URL=http://localhost:8080/api" > .env

# 4. Ejecutar en desarrollo
npm run dev
```

La aplicación estará en `http://localhost:5173`

### Android - Paso a Paso

```bash
# 1. Abrir en Android Studio
File → Open → GuatequeStore/Android

# 2. Esperar a que Gradle sincronice (puede tomar un par de minutos)

# 3. Conectar un dispositivo o crear un emulador
Tools → Device Manager

# 4. Run
Run → Run 'app'
```

---

## Problemas Comunes

### El backend no inicia

**Problema**: `Connection refused`

**Solución**: Asegúrate de que MySQL está corriendo:
```bash
# En Windows
net start MySQL80

# En Mac
mysql.server start

# En Linux
sudo systemctl start mysql
```

### Frontend no se conecta al backend

**Problema**: Error CORS

**Solución**: Verifica que el backend está en puerto 8080 y el frontend en 5173. En producción, configura CORS correctamente.

### Android muestra "Connection refused"

**Problema**: Está intentando conectar a `localhost`

**Solución**: En el emulador usa `10.0.2.2:8080`. En dispositivo físico usa la IP real de tu máquina.

### Token expirado después de 24 horas

**Solución**: El usuario debe hacer login nuevamente.

---

## Cómo Contribuir

Si quieres ayudar con el desarrollo:

1. **Fork** el repositorio en GitHub
2. **Crea una rama** descriptiva:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. **Haz cambios** y **commit** con mensajes claros:
   ```bash
   git commit -m "feat: agregar nueva funcionalidad"
   ```
4. **Push** a tu rama:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. **Abre un Pull Request** describiendo qué cambiaste y por qué

### Estándares de Código

- **Backend**: Usa convenciones de Spring Boot, añade comentarios donde sea necesario
- **Frontend**: Componentes funcionales, reutiliza código, sigue la estructura existente
- **Android**: Mantén la estructura de Activities/Fragments, comenta el código complejo

---

## Créditos y Licencia

Este proyecto está bajo la **MIT License**, lo que significa que puedes usarlo, modificarlo y distribuirlo libremente.

Desarrollado por el equipo de GuatequeStore.

---