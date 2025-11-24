import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormCustomers from '../../components/forms/formcustomers/FormCustomers';
import { authService } from '../../services/authService';

const Register = () => {
  const navigate = useNavigate();

  // Si ya está autenticado, redirigir al home
  if (authService.isAuthenticated()) {
    navigate('/');
    return null;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Registro de Cliente</h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
        Crea tu cuenta para acceder a todos nuestros productos
      </p>
      <FormCustomers />
      
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p>¿Ya tienes cuenta? <a href="/login" style={{ color: '#007bff' }}>Inicia sesión aquí</a></p>
      </div>
    </div>
  );
};

export default Register;