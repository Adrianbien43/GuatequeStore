import { useState, useEffect } from 'react';
import { getPedidos, createPedido, updatePedido, deletePedido } from '../../services/pedidoService';
import { getClientes } from '../../services/clientesService';
import { getAlmacenes } from '../../services/almacenService';

function PedidoForm() {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [almacenes, setAlmacenes] = useState([]);
  
  const [fechaPedido, setFechaPedido] = useState('');
  const [estadoPedido, setEstadoPedido] = useState('PENDIENTE');
  const [clienteId, setClienteId] = useState('');
  const [almacenId, setAlmacenId] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  // Cargar datos al iniciar
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const pedidosRes = await getPedidos();
      const clientesRes = await getClientes();
      const almacenesRes = await getAlmacenes();
      
      setPedidos(pedidosRes.data);
      setClientes(clientesRes.data);
      setAlmacenes(almacenesRes.data);
    } catch (error) {
      console.log('Error cargando datos');
    }
  };

  const guardarPedido = async (e) => {
    e.preventDefault();

    const datosPedido = {
      fechaPedido,
      estadoPedido,
      cliente: { id: parseInt(clienteId) },
      almacen: { id: parseInt(almacenId) }
    };

    try {
      if (editandoId) {
        await updatePedido(editandoId, datosPedido);
      } else {
        await createPedido(datosPedido);
      }
      
      limpiarFormulario();
      cargarDatos();
    } catch (error) {
      console.log('Error guardando pedido');
    }
  };

  const limpiarFormulario = () => {
    setFechaPedido('');
    setEstadoPedido('PENDIENTE');
    setClienteId('');
    setAlmacenId('');
    setEditandoId(null);
  };

  const editarPedido = (pedido) => {
    setFechaPedido(pedido.fechaPedido);
    setEstadoPedido(pedido.estadoPedido);
    setClienteId(pedido.cliente.id.toString());
    setAlmacenId(pedido.almacen.id.toString());
    setEditandoId(pedido.id);
  };

  const eliminarPedido = async (id) => {
    if (window.confirm('¿Eliminar pedido?')) {
      try {
        await deletePedido(id);
        cargarDatos();
      } catch (error) {
        console.log('Error eliminando pedido');
      }
    }
  };

  return (
    <div>
      <h2>Pedidos</h2>

      <form onSubmit={guardarPedido}>
        <input 
          type="date" 
          value={fechaPedido}
          onChange={e => setFechaPedido(e.target.value)} 
          required 
        />

        <select 
          value={estadoPedido}
          onChange={e => setEstadoPedido(e.target.value)}
        >
          <option value="PENDIENTE">PENDIENTE</option>
          <option value="CONFIRMADO">CONFIRMADO</option>
          <option value="EN_PREPARACION">EN PREPARACIÓN</option>
          <option value="ENVIADO">ENVIADO</option>
          <option value="ENTREGADO">ENTREGADO</option>
          <option value="CANCELADO">CANCELADO</option>
        </select>

        <select 
          value={clienteId}
          onChange={e => setClienteId(e.target.value)}
          required
        >
          <option value="">Seleccionar cliente</option>
          {clientes.map(cliente => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nombre}
            </option>
          ))}
        </select>

        <select 
          value={almacenId}
          onChange={e => setAlmacenId(e.target.value)}
          required
        >
          <option value="">Seleccionar almacén</option>
          {almacenes.map(almacen => (
            <option key={almacen.id} value={almacen.id}>
              {almacen.nombre}
            </option>
          ))}
        </select>

        <button type="submit">
          {editandoId ? 'Actualizar' : 'Crear'}
        </button>
        
        {editandoId && 
          <button type="button" onClick={limpiarFormulario}>
            Cancelar
          </button>
        }
      </form>

      <h3>Lista de Pedidos</h3>
      <ul>
        {pedidos.map(pedido => (
          <li key={pedido.id}>
            Fecha: {pedido.fechaPedido} - Estado: {pedido.estadoPedido} - 
            Cliente: {pedido.cliente.nombre} - 
            Almacén: {pedido.almacen.nombre}
            <button onClick={() => editarPedido(pedido)}>Editar</button>
            <button onClick={() => eliminarPedido(pedido.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PedidoForm;