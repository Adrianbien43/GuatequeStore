import { useState, useEffect } from 'react';
import { getProveedores, createProveedor, updateProveedor, deleteProveedor } from './../../services/proovedoresService';

function ProveedorForm() {
  // Lista de proveedores
  const [proveedores, setProveedores] = useState([]);

  // Campos del formulario (solo los que existen en el modelo)
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');

  // ID del proveedor en edición
  const [editingId, setEditingId] = useState(null);

  // Carga inicial
  useEffect(() => {
    cargarProveedores();
  }, []);

  // Obtener todos los proveedores
  const cargarProveedores = async () => {
    try {
      const res = await getProveedores();
      setProveedores(res.data);
    } catch (err) {
      console.error('Error al cargar proveedores', err);
    }
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Objeto exactamente como lo espera el backend
    const payload = {
      nombre: nombre,
      direccion: direccion || null
    };

    try {
      if (editingId) {
        await updateProveedor(editingId, payload);
      } else {
        await createProveedor(payload);
      }
      limpiarFormulario();
      cargarProveedores();
    } catch (err) {
      alert('Error al guardar proveedor');
      console.error(err);
    }
  };

  // Limpiar formulario
  const limpiarFormulario = () => {
    setNombre('');
    setDireccion('');
    setEditingId(null);
  };

  // Cargar datos para edición
  const editar = (proveedor) => {
    setNombre(proveedor.nombre);
    setDireccion(proveedor.direccion || '');
    setEditingId(proveedor.id);
  };

  // Eliminar proveedor
  const eliminar = async (id) => {
    if (!window.confirm('¿Eliminar este proveedor?')) return;
    try {
      await deleteProveedor(id);
      cargarProveedores();
    } catch (err) {
      alert('Error al eliminar');
    }
  };

  return (
    <div>
      <h2>Gestión de Proveedores</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="text"
          placeholder="Dirección (opcional)"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
        <br /><br />

        <button type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>
        {editingId && <button type="button" onClick={limpiarFormulario}>Cancelar</button>}
      </form>

      <hr />

      {/* Lista de proveedores */}
      <h3>Proveedores</h3>
      <ul>
        {proveedores.map(p => (
          <li key={p.id}>
            {p.nombre}
            {p.direccion && ` - ${p.direccion}`}
            <button onClick={() => editar(p)}>Editar</button>
            <button onClick={() => eliminar(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProveedorForm;