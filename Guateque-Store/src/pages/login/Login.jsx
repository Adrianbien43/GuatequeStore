import React, { useState } from 'react';
import { authService } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Iniciar Sesión</h1>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '0.5rem', 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '0.5rem', 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
        </div>
        
        {error && (
          <div style={{ 
            color: 'red', 
            backgroundColor: '#ffe6e6', 
            padding: '0.5rem', 
            borderRadius: '4px',
            marginBottom: '1rem'
          }}>
            {error}
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            background: loading ? '#6c757d' : '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '1rem'
          }}
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>
      
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <p>¿No tienes cuenta? <a href="/register" style={{ color: '#007bff' }}>Regístrate aquí</a></p>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: '4px' }}>
        <h3 style={{ marginBottom: '1rem' }}>Usuarios de prueba:</h3>
        
        <div style={{ marginBottom: '0.5rem' }}>
          <strong>Administradores:</strong>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            onClick={() => fillCredentials('adrian@admin.com', 'admin123')}
            style={{ 
              padding: '0.5rem', 
              background: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Usar Adrian (Admin)
          </button>
          <button 
            onClick={() => fillCredentials('gorka@admin.com', 'admin123')}
            style={{ 
              padding: '0.5rem', 
              background: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Usar Gorka (Admin)
          </button>
          <button 
            onClick={() => fillCredentials('manuel@admin.com', 'admin123')}
            style={{ 
              padding: '0.5rem', 
              background: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Usar Manuel (Admin)
          </button>
        </div>
        
        <div style={{ margin: '1rem 0 0.5rem 0' }}>
          <strong>Usuario normal:</strong>
        </div>
        <button 
          onClick={() => fillCredentials('pepe@cliente.com', 'cliente123')}
          style={{ 
            padding: '0.5rem', 
            background: '#17a2b8', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Usar Pepe (Cliente)
        </button>
      </div>
    </div>
  );
};

export default Login;