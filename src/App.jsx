// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/public/Header";
import Footer from "./components/public/Footer";

// Public Pages
import Inicio from "./pages/public/Inicio";
import Mujer from "./pages/public/Mujer";
import Hombre from "./pages/public/Hombre";
import DetallesProducto from "./pages/public/DetallesProducto";
import Carrito from "./pages/public/Carrito";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import ProductosAdmin from "./pages/admin/ProductosAdmin";
import ClientesAdmin from "./pages/admin/ClientesAdmin";
import PedidosAdmin from "./pages/admin/PedidosAdmin";

const isAuthenticated = () => {
  return localStorage.getItem("token") ? true : false;
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/auth/login" />;
};

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/mujer" element={<Mujer />} />
        <Route path="/hombre" element={<Hombre />} />
        <Route path="/producto/:id" element={<DetallesProducto />} />
        <Route path="/carrito" element={<Carrito />} />
        
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        
        <Route path="/admin/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/admin/productos" element={<PrivateRoute><ProductosAdmin /></PrivateRoute>} />
        <Route path="/admin/clientes" element={<PrivateRoute><ClientesAdmin /></PrivateRoute>} />
        <Route path="/admin/pedidos" element={<PrivateRoute><PedidosAdmin /></PrivateRoute>} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;