import React from "react";
import { Link } from "react-router-dom";
import PedidoForm from "../../components/admin/PedidoForm";

export default function PedidosAdmin() {
  return (
    <div>
      <h1>Gestión de Pedidos</h1>
      <p>Revisa y gestiona los pedidos de los clientes</p>
      <PedidoForm/>
      <Link to="/admin/dashboard">Volver al Dashboard</Link>
    </div>
  );
}