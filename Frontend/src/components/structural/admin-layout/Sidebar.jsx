import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import styles from './AdminLayout.module.css';

/**
 * Sidebar - Componente de navegación lateral del panel administrativo
 * Muestra secciones y enlaces según el rol del usuario
 * 
 * Props:
 * - activeSection: string - sección activa actual
 * - onSectionChange: function - callback al cambiar de sección
 * 
 * Features:
 * - Navegación por secciones
 * - Resaltado de sección activa
 * - Visibilidad basada en rol (Gestión de Clientes solo para ADMINISTRADOR)
 */
export default function Sidebar({ activeSection, onSectionChange }) {
  const { user } = useContext(AuthContext);

  // Secciones disponibles
  const sections = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      category: 'Principal',
      role: ['CLIENTE', 'ADMINISTRADOR']
    },
    {
      id: 'administracion',
      label: 'Administración',
      category: 'Gestión de Datos',
      role: ['ADMINISTRADOR']
    },
    {
      id: 'proveedores',
      label: 'Proveedores',
      category: 'Gestión de Datos',
      role: ['ADMINISTRADOR']
    },
    {
      id: 'productos',
      label: 'Productos',
      category: 'Gestión de Datos',
      role: ['ADMINISTRADOR']
    },
    {
      id: 'almacenes',
      label: 'Almacenes',
      category: 'Gestión de Datos',
      role: ['ADMINISTRADOR']
    },
    {
      id: 'inventarios',
      label: 'Inventarios',
      category: 'Gestión de Datos',
      role: ['ADMINISTRADOR']
    },
    {
      id: 'pedidos',
      label: 'Pedidos',
      category: 'Gestión de Datos',
      role: ['ADMINISTRADOR']
    },
    {
      id: 'clientes',
      label: 'Clientes',
      category: 'Gestión de Usuarios',
      role: ['ADMINISTRADOR']
    },
  ];

  // Filtrar secciones según rol del usuario
  const userRole = user?.rol || [];
  const visibleSections = sections.filter(section =>
    section.role.includes(userRole)
  );

  // Agrupar secciones por categoría
  const grouped = {};
  visibleSections.forEach(section => {
    if (!grouped[section.category]) {
      grouped[section.category] = [];
    }
    grouped[section.category].push(section);
  });

  return (
    <div className={styles.sidebar}>
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className={styles.sidebarSection}>
          <div className={styles.sectionTitle}>{category}</div>
          {items.map(item => (
            <div
              key={item.id}
              className={`${styles.navItem} ${activeSection === item.id ? styles.active : ''}`}
              onClick={() => onSectionChange(item.id)}
            >
              <span className={styles.navIcon}>
                {/* Iconos simples (podrían reemplazarse con react-icons) */}
                {item.id === 'dashboard' && '📊'}
                {item.id === 'administracion' && '⚙️'}
                {item.id === 'proveedores' && '🏢'}
                {item.id === 'productos' && '👕'}
                {item.id === 'almacenes' && '📦'}
                {item.id === 'inventarios' && '📈'}
                {item.id === 'pedidos' && '🛒'}
                {item.id === 'clientes' && '👥'}
              </span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
