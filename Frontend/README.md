# 🖥️ Frontend - GuatequeStore

## 📋 Descripción del Proyecto

Este módulo contiene el frontend de **GuatequeStore**, desarrollado con **React** y **Vite**. La aplicación web permite a los usuarios explorar productos de moda, gestionar carritos de compra y completar pedidos en una interfaz moderna y responsiva.

**Estado actual:** Estamos implementando mejoras continuas. Actualmente tenemos un sistema de scroll horizontal para navegar productos, pero estamos evaluando reconstruir esta funcionalidad para mejorar la experiencia de usuario.

## 🎨 Diseño y Experiencia

### ✨ Lo que Hicimos Bien
Hemos creado una interfaz limpia, moderna y totalmente responsiva que refleja los valores de sostenibilidad de GuatequeStore. El diseño sigue fielmente nuestro sistema de diseño en Figma y ofrece una navegación intuitiva.

### 🔄 Áreas de Mejora
Reconocemos que el **scroll horizontal** implementado para la navegación de productos no ofrece la mejor experiencia de usuario que imaginamos. El equipo está considerando reconstruir esta funcionalidad completamente para implementar una solución más robusta y amigable.

## 🖼️ Vista Previa
![Captura de pantalla del Frontend](public/screenshot.png)

## Figma
Este es el enlace del figma.

https://www.figma.com/design/vbEG6WmzHaxsk2JROq9KnC/KORA-DESIGN?node-id=1-2381&t=c40bGH3AkG5NkY87-1

## 📁 Estructura del Proyecto

```text
GuatequeStore/
├── Android/                 # Aplicación móvil en Java
│   ├── app/                 # Código fuente de Android
│   └── build/               # Archivos de compilación
├── Frontend/                # Aplicación web en React
│   ├── public/              # Archivos estáticos (imágenes, favicon, etc.)
│   ├── src/                 # Código fuente principal
│   │   ├── assets/          # Imágenes, fuentes, etc.
│   │   ├── components/      # Componentes reutilizables
│   │   ├── pages/           # Páginas principales
│   │   ├── styles/          # Archivos CSS/SCSS
│   │   ├── App.jsx          # Componente raíz
│   │   └── main.jsx         # Punto de entrada
│   ├── index.html           # Template HTML
│   ├── package.json         # Dependencias y scripts
│   ├── vite.config.js       # Configuración de Vite
│   └── eslint.config.js     # Reglas de linting
├── Backend/                 # API y lógica del servidor en Java + Spring Boot
│   ├── src/                 # Código fuente
│   ├── pom.xml              # Dependencias y configuración Maven/Gradle
│   └── application.properties # Configuración del servidor
└── README.md                # Documentación general del proyecto


## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 18 o superior
- npm o yarn

### Pasos para ejecutar

1. **Clonar el repositorio:**
```bash


##Instalar dependencias:
npm install

##Ejecutar en desarrollo
npm run dev