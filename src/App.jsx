import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/public/Header";
import Footer from "./components/public/Footer";
import styles from "./App.module.css";

// Public Pages
import Inicio from "./pages/public/Inicio";
import Mujer from "./pages/public/Mujer";
import Hombre from "./pages/public/Hombre";
import DetallesProducto from "./pages/public/DetallesProducto";
import Carrito from "./pages/public/Carrito";

// Auth Pages
import Login from "./pages/auth/authadmin/Login";
import Register from "./pages/auth/authadmin/Register";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import ProductosAdmin from "./pages/admin/ProductosAdmin";
import ClientesAdmin from "./pages/admin/ClientesAdmin";
import PedidosAdmin from "./pages/admin/PedidosAdmin";
import ProveedoresAdmin from "./pages/admin/ProveedoresAdmin";
import AccessAdmin from "./pages/admin/AdminAccess";

// Función para verificar autenticación
const isAuthenticated = () => {
  return localStorage.getItem("user") ? true : false;
};

// Layout público con Header
const PublicLayout = () => (
  <>
  <div className={styles.Body}>
  <Header />
  <Outlet />
  <Footer />
  </div>
  </>
);

// Layout admin con autenticación
const AdminLayout = () => {
  if (!isAuthenticated()) return <Navigate to="/auth/login" />;
  return (
    <div className={styles.adminContainer}>
      <Outlet />
    </div>
  );
};


function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas con Header */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/mujer" element={<Mujer />} />
        <Route path="/hombre" element={<Hombre />} />
        <Route path="/producto/:id" element={<DetallesProducto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/administracion" element={<AccessAdmin />} />

      </Route>

      {/* Rutas de autenticación */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />

      {/* Rutas de admin con autenticación */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="productos" element={<ProductosAdmin />} />
        <Route path="clientes" element={<ClientesAdmin />} />
        <Route path="pedidos" element={<PedidosAdmin />} />
        <Route path="proveedores" element={<ProveedoresAdmin />} />
      </Route>

      {/* Ruta catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;