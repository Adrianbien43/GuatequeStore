import React from "react";
import { Link } from "react-router-dom";

export default function AccessAdmin() {
  return (
    <div>
      <h1>Acceso de Administrador</h1>
      <p>Administra todo lo que quieras</p>
      <Link to="/admin/inicio">Volver al Home</Link>
      <Link to="/auth/login">Inicia Sesion</Link>
      <Link to="/auth/register">Registrate</Link>
    </div>
  );
}