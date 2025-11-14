import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <h1>Panel de Administración</h1>
      <p>Bienvenido al centro de control de la tienda</p>
      <nav>
        <Link to="/admin/productos">Gestionar Productos</Link> | 
        <Link to="/admin/clientes">Gestionar Clientes</Link> | 
        <Link to="/admin/pedidos">Ver Pedidos</Link> | 
          <Link to="/admin/proveedores">Ver Proveedores</Link> | 
        <Link to="/">Ir al Sitio Público</Link>
      </nav>
    </div>
  );
}