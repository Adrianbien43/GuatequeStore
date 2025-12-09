import React from "react";
import { Link } from "react-router-dom";

export default function Mujer() {
  return (
    <div>
      <h1>Moda Mujer</h1>
      <p>Descubre nuestra colección exclusiva para mujer</p>
      <Link to="/producto/1">Ver Vestido Floral</Link> | 
      <Link to="/">Volver al Inicio</Link>
    </div>
  );
}