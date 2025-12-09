import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  // Obtener el usuario actual del contexto
  const { user } = useAuth();

  return (
    <div>
      <h1>Panel de Administración</h1>
      <p>Bienvenido al panel de control, <strong>{user.name}</strong></p>
      
      <div>
        <h2>Opciones disponibles:</h2>
        <ul>
          <li><Link to="/admin/productos">Gestionar Productos</Link></li>
           <li><Link to="/admin/clientes">Gestionar Clientes</Link></li>
           <li><Link to="/admin/pedidos">Gestionar Pedidos</Link></li>
           <li><Link to="/admin/proveedores">Gestionar Proveedores</Link></li>
          <li><Link to="/">Volver a la Tienda</Link></li>
        </ul>
      </div>
    </div>
  );
}