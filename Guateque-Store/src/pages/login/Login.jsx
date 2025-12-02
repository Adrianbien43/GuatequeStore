import React, { useState } from 'react';
import { authService } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(email, password);
      navigate('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = (email, password) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    
      <section className="login-section">
        <div className="login-container">
          <h1>Iniciar Sesión</h1>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Contraseña:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>
          
          <div className="register-link">
            <p>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
          </div>

          <div className="test-users">
            <h3>Usuarios de prueba:</h3>
            
            <div className="users-section">
              <strong>Administradores:</strong>
            </div>
            <div className="test-buttons">
              <button onClick={() => fillCredentials('adrian@admin.com', 'admin123')} className="btn-admin">
                Usar Adrian (Admin)
              </button>
              <button onClick={() => fillCredentials('gorka@admin.com', 'admin123')} className="btn-admin">
                Usar Gorka (Admin)
              </button>
              <button onClick={() => fillCredentials('manuel@admin.com', 'admin123')} className="btn-admin">
                Usar Manuel (Admin)
              </button>
            </div>
            
            <div className="users-section">
              <strong>Usuario normal:</strong>
            </div>
            <button onClick={() => fillCredentials('pepe@cliente.com', 'cliente123')} className="btn-user">
              Usar Pepe (Cliente)
            </button>
          </div>
        </div>
      </section>
    
  );
};

export default Login;