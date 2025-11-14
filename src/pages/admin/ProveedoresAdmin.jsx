import React from "react";
import { Link } from "react-router-dom";

export default function ProveedoresAdmin() {
  return (
    <div>
      <h1>Gestión de Proveedores</h1>
      <p>Administra los proveedores</p>
      <Link to="/admin/dashboard">Volver al Dashboard</Link>
    </div>
  );
}