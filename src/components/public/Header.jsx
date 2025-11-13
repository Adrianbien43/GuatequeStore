import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Inicio</Link> | 
        <Link to="/mujer">Mujer</Link> | 
        <Link to="/hombre">Hombre</Link> | 
        <Link to="/carrito">Carrito</Link> | 
        <Link to="/auth/login">Login</Link> | 
        <Link to="/auth/register">Registro</Link>
      </nav>
      <hr />
    </header>
  );
}