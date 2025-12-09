import React from "react";
import { Link } from "react-router-dom";
import ClienteForm from "../../components/admin/ClienteForm";

export default function ClientesAdmin() {
  return (
    <div>
      <h1>Gestión de Clientes</h1>
      <p>Administra los clientes registrados en el sistema</p>
      <ClienteForm />
      <Link to="/admin/dashboard">Volver al Dashboard</Link>
    </div>
  );
}