import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormCustomers from '../../components/forms/formcustomers/FormCustomers';
import { authService } from '../../services/authService';
import PageContainer from '../modelpage/PageContainer';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  // Si ya está autenticado, redirigir al home
  if (authService.isAuthenticated()) {
    navigate('/');
    return null;
  }

return (
    <PageContainer>
      <section className="register-section">
        <div className="register-content">
          <h1>Registro de Cliente</h1>
          <p className="register-subtitle">
            Crea tu cuenta para acceder a todos nuestros productos
          </p>
          <FormCustomers />
          
          <div className="register-footer">
            <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a></p>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};

export default Register;