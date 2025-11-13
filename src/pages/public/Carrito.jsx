import React from "react";
import { Link } from "react-router-dom";

export default function Carrito() {
  return (
    <div>
      <h1>Carrito de Compras</h1>
      <p>Gestiona tus productos antes de la compra</p>
      <Link to="/">Seguir Comprando</Link> | 
      <Link to="/auth/login">Proceder al Pago</Link>
    </div>
  );
}