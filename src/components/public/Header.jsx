import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  // Obtener el usuario y la función logout del contexto
  const { user, logout } = useAuth();

  // Función para cerrar sesión
  const handleLogout = () => {
    logout();
  };

  return (
    <header>
      {/* Navegación principal */}
      <nav>
        <div>
          {/* Enlaces de navegación */}
          <Link to="/">Inicio</Link> | 
          <Link to="/mujer">Mujer</Link> | 
          <Link to="/hombre">Hombre</Link> | 
          <Link to="/carrito">Carrito</Link>
          <Link to="/administracion">Administracion</Link>
          
        </div>
        
        <div>
          {/* Si hay usuario logueado, mostrar opciones de usuario */}
          {user ? (
            <div>
              <span>Bienvenido, {user.name}</span> | 
              <Link to="/admin/dashboard">Panel Admin</Link> | 
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
          ) : (
            /* Si no hay usuario, mostrar opciones de login/registro */
            <div>
           
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}