import React from "react";
import { Link } from "react-router-dom";
import ProductoForm from "../../components/admin/ProductoForm";

export default function ProductosAdmin() {
  return (
    <div>
      <h1>Gestión de Productos</h1>
      <p>Administra el catálogo de productos de la tienda</p>
      <ProductoForm/>
      <Link to="/admin/dashboard">Volver al Dashboard</Link>
    </div>
  );
}