// src/components/maincomponents/header/Header.jsx
import React, { useState, useEffect } from 'react';
import { authService } from '../../../services/authService';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [user, setUser] = useState(authService.getCurrentUser());
  const [isAdmin, setIsAdmin] = useState(authService.isAdmin());
  const navigate = useNavigate();

  // ←←← ACTUALIZACIÓN INSTANTÁNEA ←←←
  useEffect(() => {
    const updateHeader = () => {
      setUser(authService.getCurrentUser());
      setIsAdmin(authService.isAdmin());
    };

    // Carga inicial
    updateHeader();

    // Escucha el evento mágico (disparado en login/logout)
    window.addEventListener('auth-change', updateHeader);

    // Limpieza
    return () => {
      window.removeEventListener('auth-change', updateHeader);
    };
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc', background: '#f5f5f5' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link to="/" style={{ marginRight: '1rem', textDecoration: 'none', color: '#333' }}>
            Inicio
          </Link>
          {user && (
            <>
              <Link to="/men" style={{ marginRight: '1rem', textDecoration: 'none', color: '#333' }}>
                Hombre
              </Link>
              <Link to="/women" style={{ marginRight: '1rem', textDecoration: 'none', color: '#333' }}>
                Mujer
              </Link>
            </>
          )}
          {isAdmin && (
            <Link to="/panel" style={{ marginRight: '1rem', textDecoration: 'none', color: '#333' }}>
              Panel
            </Link>
          )}
        </div>
        
        <div>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span>Bienvenido, {user.nombre}</span>
              <button 
                onClick={handleLogout}
                style={{ 
                  padding: '0.5rem 1rem', 
                  background: '#dc3545', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div>
              <Link to="/register" style={{ marginRight: '1rem', textDecoration: 'none', color: '#007bff' }}>
                Registro
              </Link>
              <Link to="/login" style={{ textDecoration: 'none', color: '#007bff' }}>
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