import React from "react";
import { useParams, Link } from "react-router-dom";

export default function DetallesProducto() {
  const { id } = useParams();
  
  return (
    <div>
      <h1>Detalles del Producto #{id}</h1>
      <p>Información completa sobre el producto seleccionado</p>
      <Link to="/carrito">Agregar al Carrito</Link> | 
      <Link to="/mujer">Volver a Mujer</Link> | 
      <Link to="/hombre">Volver a Hombre</Link>
    </div>
  );
}