import React from "react";
import { Link } from "react-router-dom";

export default function Hombre() {
  return (
    <div>
      <h1>Moda Hombre</h1>
      <p>Estilo y elegancia para el hombre moderno</p>
      <Link to="/producto/2">Ver Camisa Formal</Link> | 
      <Link to="/">Volver al Inicio</Link>
    </div>
  );
}