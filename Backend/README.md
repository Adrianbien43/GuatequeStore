# ⚙️ Backend - GuatequeStore

## 📋 Descripción del Proyecto
Este módulo contiene el **backend de GuatequeStore**, desarrollado con **Java** y **Spring Boot**.  
Su función principal es exponer **APIs REST** que gestionan productos, proveedores, pedidos, inventario y clientes, conectando la aplicación web y móvil con la base de datos.

---

## 🖼️ Diagramas y Vista General

### Base de Datos
![Diagrama de la base de datos](docs/database.png)  
*Representación de tablas y relaciones principales.*

### UML
![Diagrama UML](docs/uml.png)  
*Diagrama de clases y relaciones entre entidades del proyecto.*

### Organización del Backend
![Estructura Backend](docs/estructura-backend.png)  
*Visualización de la estructura real del backend.*

---

## 📁 Estructura del Proyecto

```text
Backend/
└── src/
    └── main/
        ├── java/com/guatequestore/backend/
        │   ├── almacen/
        │   │   ├── controller/
        │   │   ├── model/
        │   │   ├── repository/
        │   │   ├── service/
        │   │   └── authentication/
        │   ├── cliente/
        │   ├── config/
        │   ├── exception/
        │   ├── inventario/
        │   ├── pedido/
        │   ├── producto/
        │   ├── proveedor/
        │   ├── security/
        │   └── GuatequeStoreApplication.java
        └── resources/
    └── test/
