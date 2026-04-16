import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import styles from './AdminLayout.module.css';

/**
 * TopBar - Componente de barra superior del panel administrativo
 * Muestra el nombre del usuario y el botón de logout
 * 
 * Props:
 * - None (usa AuthContext directamente)
 * 
 * Features:
 * - Nombre del usuario en esquina superior derecha
 * - Avatar con inicial del nombre
 * - Botón logout
 */
export default function TopBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Obtener la inicial del nombre para el avatar
  const userInitial = user?.nombre ? user.nombre.charAt(0).toUpperCase() : '?';

  // Manejar logout
  const handleLogout = () => {
    logout();
    navigate('/iniciar');
  };

  return (
    <div className={styles.topBar}>
      <div className={styles.topBarLeft}>GS Dashboard</div>
      
      <div className={styles.topBarRight}>
        {user && (
          <div className={styles.userInfo}>
            <span>Hola, {user.nombre}</span>
            <div className={styles.userAvatar}>
              {userInitial}
            </div>
          </div>
        )}
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
