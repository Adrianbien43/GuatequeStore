import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <p>Accede a tu cuenta para una experiencia personalizada</p>
      <Link to="/auth/register">¿No tienes cuenta? Regístrate</Link> | 
      <Link to="/">Volver al Inicio</Link>
    </div>
  );
}