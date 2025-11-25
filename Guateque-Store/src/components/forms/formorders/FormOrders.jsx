// src/components/admin/FormOrders.jsx (o donde lo tengas)
import React, { useState, useEffect } from 'react';
import { 
  getPedidos, 
  createPedido, 
  updatePedido, 
  deletePedido 
} from '../../../services/orderService';
import { customerService } from '../../../services/customerService';
import { getAlmacenes } from '../../../services/warehouseService';

const FormOrders = () => {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [almacenes, setAlmacenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Formulario
  const [fechaPedido, setFechaPedido] = useState('');
  const [estadoPedido, setEstadoPedido] = useState('PENDIENTE');
  const [clienteId, setClienteId] = useState('');
  const [almacenId, setAlmacenId] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  // Búsqueda en clientes
  const [buscarCliente, setBuscarCliente] = useState('');

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError('');

      const [pedidosRes, clientesRes, almacenesRes] = await Promise.all([
        getPedidos(),
        customerService.getAll(),           // devuelve directamente el array
        getAlmacenes()
      ]);

      setPedidos(pedidosRes.data || pedidosRes); // por si tu orderService devuelve data o directamente array
      setClientes(clientesRes || []);             // getAll() ya devuelve el array
      setAlmacenes(almacenesRes.data || almacenesRes);
    } catch (err) {
      console.error('Error cargando datos:', err);
      setError('Error al cargar los datos. Reintentando...');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clienteId || !almacenId || !fechaPedido) {
      alert('Completa todos los campos obligatorios');
      return;
    }

    const pedidoData = {
      fechaPedido,
      estadoPedido,
      cliente: { id: Number(clienteId) },
      almacen: { id: Number(almacenId) }
    };

    try {
      if (editandoId) {
        await updatePedido(editandoId, pedidoData);
      } else {
        await createPedido(pedidoData);
      }

      resetForm();
      await cargarDatos();
      alert(`Pedido ${editandoId ? 'actualizado' : 'creado'} correctamente`);
    } catch (err) {
      alert('Error al guardar el pedido');
      console.error(err);
    }
  };

  const resetForm = () => {
    setFechaPedido('');
    setEstadoPedido('PENDIENTE');
    setClienteId('');
    setAlmacenId('');
    setEditandoId(null);
  };

  const editarPedido = (pedido) => {
    setFechaPedido(pedido.fechaPedido?.split('T')[0] || '');
    setEstadoPedido(pedido.estadoPedido || 'PENDIENTE');
    setClienteId(pedido.cliente?.id?.toString() || '');
    setAlmacenId(pedido.almacen?.id?.toString() || '');
    setEditandoId(pedido.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const eliminarPedido = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este pedido?')) return;

    try {
      await deletePedido(id);
      cargarDatos();
      alert('Pedido eliminado');
    } catch (err) {
      alert('Error al eliminar');
    }
  };

  // Filtrar clientes según búsqueda
  const clientesFiltrados = clientes.filter(c =>
    c.nombre?.toLowerCase().includes(buscarCliente.toLowerCase()) ||
    c.email?.toLowerCase().includes(buscarCliente.toLowerCase())
  );

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Cargando pedidos y clientes...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red', textAlign: 'center' }}>{error}</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2.2rem', marginBottom: '2rem', color: '#333' }}>
        Gestión de Pedidos
      </h1>

      {/* Formulario */}
      <div style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        marginBottom: '3rem'
      }}>
        <h2 style={{ marginTop: 0, color: '#1976d2' }}>
          {editandoId ? 'Editar Pedido' : 'Nuevo Pedido'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr)' }}>
          <div>
            <label><strong>Fecha del Pedido *</strong></label>
            <input
              type="date"
              value={fechaPedido}
              onChange={(e) => setFechaPedido(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label><strong>Estado</strong></label>
            <select value={estadoPedido} onChange={(e) => setEstadoPedido(e.target.value)} style={selectStyle}>
              <option value="PENDIENTE">Pendiente</option>
              <option value="CONFIRMADO">Confirmado</option>
              <option value="EN_PREPARACION">En Preparación</option>
              <option value="ENVIADO">Enviado</option>
              <option value="ENTREGADO">Entregado</option>
              <option value="CANCELADO">Cancelado</option>
            </select>
          </div>

          <div>
            <label><strong>Cliente *</strong></label>
            <input
              type="text"
              placeholder="Buscar cliente por nombre o email..."
              value={buscarCliente}
              onChange={(e) => setBuscarCliente(e.target.value)}
              style={inputStyle}
            />
            <select
              value={clienteId}
              onChange={(e) => setClienteId(e.target.value)}
              required
              style={selectStyle}
            >
              <option value="">Selecciona un cliente</option>
              {clientesFiltrados.map(cliente => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre} {cliente.apellido && `- ${cliente.apellido}`} ({cliente.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label><strong>Almacén *</strong></label>
            <select value={almacenId} onChange={(e) => setAlmacenId(e.target.value)} required style={selectStyle}>
              <option value="">Selecciona almacén</option>
              {almacenes.map(a => (
                <option key={a.id} value={a.id}>
                  {a.nombre} - {a.direccion || a.ciudad}
                </option>
              ))}
            </select>
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" style={btnPrimary}>
              {editandoId ? 'Actualizar Pedido' : 'Crear Pedido'}
            </button>
            {editandoId && (
              <button type="button" onClick={resetForm} style={btnSecondary}>
                Cancelar Edición
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Lista de Pedidos */}
      <h2 style={{ margin: '2rem 0 1rem' }}>Lista de Pedidos ({pedidos.length})</h2>

      {pedidos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', fontSize: '1.1rem' }}>
          No hay pedidos registrados aún.
        </p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <thead style={{ background: '#1976d2', color: 'white' }}>
              <tr>
                <th style={thStyle}>Fecha</th>
                <th style={thStyle}>Estado</th>
                <th style={thStyle}>Cliente</th>
                <th style={thStyle}>Almacén</th>
                <th style={thStyle}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map(pedido => (
                <tr key={pedido.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={tdStyle}>{pedido.fechaPedido?.split('T')[0] || 'Sin fecha'}</td>
                  <td style={{ ...tdStyle, fontWeight: '600', color: getColorEstado(pedido.estadoPedido) }}>
                    {formatEstado(pedido.estadoPedido)}
                  </td>
                  <td style={tdStyle}>
                    {pedido.cliente?.nombre} {pedido.cliente?.apellido} <br />
                    <small style={{ color: '#666' }}>{pedido.cliente?.email}</small>
                  </td>
                  <td style={tdStyle}>{pedido.almacen?.nombre || 'N/A'}</td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <button onClick={() => editarPedido(pedido)} style={btnEdit}>
                      Editar
                    </button>
                    <button onClick={() => eliminarPedido(pedido.id)} style={btnDelete}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Estilos en objetos (más limpio que inline todo el tiempo)
const inputStyle = {
  width: '100%',
  padding: '12px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  fontSize: '1rem'
};

const selectStyle = { ...inputStyle, height: '48px' };

const btnPrimary = {
  background: '#1976d2',
  color: 'white',
  border: 'none',
  padding: '12px 24px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: '600'
};

const btnSecondary = {
  ...btnPrimary,
  background: '#666',
  marginLeft: '12px'
};

const btnEdit = {
  background: '#4caf50',
  color: 'white',
  border: 'none',
  padding: '6px 12px',
  marginRight: '8px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '0.9rem'
};

const btnDelete = {
  background: '#f44336',
  color: 'white',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '0.9rem'
};

const thStyle = {
  padding: '16px',
  textAlign: 'left',
  fontWeight: '600',
  textTransform: 'uppercase',
  fontSize: '0.9rem'
};

const tdStyle = {
  padding: '16px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd'
};

const getColorEstado = (estado) => {
  const colors = {
    ENTREGADO: '#4caf50',
    CANCELADO: '#f44336',
    PENDIENTE: '#ff9800',
    ENVIADO: '#2196f3',
    CONFIRMADO: '#2196f3',
    EN_PREPARACION: '#ff9800'
  };
  return colors[estado] || '#666';
};

const formatEstado = (estado) => {
  return estado?.replace(/_/g, ' ').charAt(estado.charAt(0).toUpperCase() + estado.slice(1).toLowerCase());
};

export default FormOrders;