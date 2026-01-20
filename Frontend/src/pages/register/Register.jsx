import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FormUsuarios from '../../components/forms/formcustomers/FormUsuarios';
import { authService } from '../../services/authService';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  // Evitar side-effect en render: usar useEffect para redirigir si ya está autenticado
  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  return (

    <section className="register-form-section" aria-labelledby="register-title">
      <div className="register-content" role="region" aria-describedby="register-subtitle">
        <h1 id="register-title">Registro de Usuario</h1>
        <p id="register-subtitle" className="register-subtitle">
          Crea tu cuenta para acceder a todos nuestros productos
        </p>

        {/* Componente de formulario */}
        <FormUsuarios />

        <div className="register-footer">
          <p>
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
          </p>
        </div>
      </div>
    </section>

  );
};

export default Register;