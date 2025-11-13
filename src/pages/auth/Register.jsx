import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div>
      <h1>Registro de Usuario</h1>
      <p>Crea tu cuenta para comenzar a comprar</p>
      <Link to="/auth/login">¿Ya tienes cuenta? Inicia Sesión</Link> | 
      <Link to="/">Volver al Inicio</Link>
    </div>
  );
}