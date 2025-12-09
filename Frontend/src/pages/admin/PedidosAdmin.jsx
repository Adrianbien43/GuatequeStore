import React from "react";
import { Link } from "react-router-dom";

export default function PedidosAdmin() {
  return (
    <div>
      <h1>Gestión de Pedidos</h1>
      <p>Revisa y gestiona los pedidos de los clientes</p>
      <Link to="/admin/dashboard">Volver al Dashboard</Link>
    </div>
  );
}