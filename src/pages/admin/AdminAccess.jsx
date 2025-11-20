import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminAccess() {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return <Navigate to="/acceso-denegado" replace />;
  }

  return (
    <div>
      <h1>Panel de Administrador</h1>
      <p>Bienvenido al área restringida de administración</p>
      
      <div>
        <h3>Opciones de Administración:</h3>
        <ul>
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/productos">Gestión de Productos</Link></li>
          <li><Link to="/admin/clientes">Gestión de Clientes</Link></li>
          <li><Link to="/admin/pedidos">Gestión de Pedidos</Link></li>
          <li><Link to="/admin/proveedores">Gestión de Proveedores</Link></li>
        </ul>
      </div>

      <div>
        <Link to="/">Volver al Home</Link>
      </div>
    </div>
  );
}