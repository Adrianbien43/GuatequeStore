// src/components/maincomponents/header/Header.jsx
import React, { useState, useEffect } from 'react';
import { authService } from '../../../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [user, setUser] = useState(authService.getCurrentUser());
  const [isAdmin, setIsAdmin] = useState(authService.isAdmin());
  const navigate = useNavigate();

  useEffect(() => {
    const updateHeader = () => {
      setUser(authService.getCurrentUser());
      setIsAdmin(authService.isAdmin());
    };

    window.addEventListener('auth-change', updateHeader);
    return () => window.removeEventListener('auth-change', updateHeader);
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <header className="header-container">
      <nav className="header-nav">
        <div className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/men">Hombre</Link>
          <Link to="/women">Mujer</Link>

          {isAdmin && <Link to="/panel">Panel</Link>}
        </div>

        <div className="auth-section">
          {user ? (
            <div className="user-info">
              <span>Bienvenido, {user.nombre}</span>
              <button onClick={handleLogout} className="logout-btn">
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div>
              <Link to="/register" className="auth-link">
                Registro
              </Link>
              <Link to="/login" className="auth-link">
                Iniciar sesión
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
