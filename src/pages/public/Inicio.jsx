import React from "react";
import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <div>
      <h1>Página de Inicio</h1>
      <p>Bienvenido a nuestra tienda online - Tu estilo, nuestra pasión</p>
      <nav>
        <Link to="/mujer">Ver Moda Mujer</Link> | 
        <Link to="/hombre">Ver Moda Hombre</Link>
      </nav>
    </div>
  );
}