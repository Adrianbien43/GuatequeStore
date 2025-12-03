import React, { useState } from 'react';
import { authService } from '../../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';

// Usuarios de prueba
const TEST_USERS = {
  admin: [
    { email: 'adrian@admin.com', password: 'admin123' },
    { email: 'gorka@admin.com', password: 'admin123' },
    { email: 'manuel@admin.com', password: 'admin123' }
  ],
  user: [
    { email: 'pepe@cliente.com', password: 'cliente123' }
  ]
};

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authService.login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    error && setError('');
  };

  // Funicon para la prueba
  const autoFillTestUser = (type = 'admin', index = 0) => {
    const user = TEST_USERS[type]?.[index];
    if (user) {
      setForm({ email: user.email, password: user.password });
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1>Iniciar Sesión</h1>
        
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            disabled={loading}
            className={styles.input}
          />
          
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Contraseña"
            required
            disabled={loading}
            className={styles.input}
          />
          
          {error && <div className={styles.error}>{error}</div>}
          
          <button 
            type="submit" 
            disabled={loading || !form.email || !form.password}
            className={styles.btnSubmit}
          >
            {loading ? 'Iniciando...' : 'Entrar'}
          </button>
        </form>
        
        <div className={styles.footer}>
          <Link to="/register" className={styles.link}>Crear cuenta</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;