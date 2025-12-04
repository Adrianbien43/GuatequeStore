import React, { useState, useEffect } from 'react';
import { authService } from '../../../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const [user, setUser] = useState(authService.getCurrentUser());
  const [isAdmin, setIsAdmin] = useState(authService.isAdmin());

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
    window.location.href = '/';
  };

  return (
    <header className={styles.headerContainer}>
      <nav className={styles.headerNav}>
        <div className={styles.navLinks}>
          <Link to="/">Inicio</Link>
          <Link to="/men">Hombre</Link>
          <Link to="/women">Mujer</Link>
          {isAdmin && <Link to="/panel">Panel</Link>}
        </div>
        <div className={styles.authSection}>
          {user ? (
            <div className={styles.userInfo}>
              <span>Bienvenido, {user.nombre}</span>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className={styles.registerLogin}>
              <Link to="/register" className={styles.authLink}>
                Registro
              </Link>
              <Link to="/login" className={styles.authLink}>
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
