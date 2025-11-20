import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./Header.module.css"

export default function Header() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.navegacion}>
          {/* SOLO enlaces públicos - NADA de admin */}
          <Link to="/">Inicio</Link> | 
          <Link to="/mujer">Mujer</Link> | 
          <Link to="/hombre">Hombre</Link> | 
          <Link to="/carrito">Carrito</Link>
          {/* (user ?  : )
            <NavLink>
              <Icon> Profile</Icon>
            </NavLink>
            <Link>Login</Link>
            // <Link>Register</Link> */}
          {/* ELIMINADO: <Link to="/administracion">Administracion</Link> */}
        </div>
        
        <div>
          {user ? (
            <div>
              <span>Bienvenido, {user.name}</span> | 
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
          ) : (
            <div>
              {/* ELIMINADO: No mostrar ningún enlace de login */}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}