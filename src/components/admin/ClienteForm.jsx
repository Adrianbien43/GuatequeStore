// src/components/ClienteCrud.js
import { useState, useEffect } from 'react';
import { getClientes, createCliente, updateCliente, deleteCliente } from '../../services/clientesService';

function ClienteForm() {
  const [clientes, setClientes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [password, setPassword] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = () => {
    getClientes().then(res => setClientes(res.data)).catch(console.error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const clienteData = { nombre, email, direccion, password };

    if (editingId) {
      updateCliente(editingId, clienteData).then(() => {
        fetchClientes();
        resetForm();
      }).catch(console.error);
    } else {
      createCliente(clienteData).then(() => {
        fetchClientes();
        resetForm();
      }).catch(console.error);
    }
  };

  const resetForm = () => {
    setNombre('');
    setEmail('');
    setDireccion('');
    setPassword('');
    setEditingId(null);
  };

  const handleEdit = (c) => {
    setNombre(c.nombre);
    setEmail(c.email);
    setDireccion(c.direccion || '');
    setPassword(''); // no traemos password
    setEditingId(c.id);
  };

  const handleDelete = (id) => {
    deleteCliente(id).then(fetchClientes).catch(console.error);
  };

  return (
    <div>
      <h2>CRUD Clientes</h2>

      <form onSubmit={handleSubmit}>
        <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" required />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <input value={direccion} onChange={e => setDireccion(e.target.value)} placeholder="Dirección" />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">{editingId ? 'Actualizar' : 'Crear'}</button>
        {editingId && <button type="button" onClick={resetForm}>Cancelar</button>}
      </form>

      <ul>
        {clientes.map(c => (
          <li key={c.id}>
            {c.nombre} ({c.email}) - {c.direccion || 'Sin dirección'}
            <button onClick={() => handleEdit(c)}>Editar</button>
            <button onClick={() => handleDelete(c.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClienteForm;
