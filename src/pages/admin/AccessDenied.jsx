import React from "react";
import { Link } from "react-router-dom";

export default function AccessDenied() {
  return (
    <div>
     
      <h2>Acceso Denegado</h2>
      <p>No tienes permisos para acceder al área de administración.</p>
      <Link to="/">Volver al Inicio</Link>
    </div>
  );
}