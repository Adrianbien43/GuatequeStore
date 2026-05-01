import { useState } from "react";
import { usePedidos } from "../hooks/usePedidos";
import { useAlmacenes } from "../../almacenes/hooks/useAlmacenes";
import { useClientes } from "../../clientes/hooks/useClientes";
import Table from "../../../../components/reusable/Table";
import styles from './PedidosCRUD.module.css';

export default function PedidosCRUD() {
  const { pedidos, loading, error, addPedido, editPedido, removePedido, setError } = usePedidos();
  const { almacenes, loading: almacenesLoading } = useAlmacenes();
  const { clientes, loading: clientesLoading } = useClientes();
  const [form, setForm] = useState({ fechaPedido: "", estadoPedido: "PENDIENTE", usuarioId: "", almacenId: "" });
  const [editing, setEditing] = useState(null);
  const [success, setSuccess] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.usuarioId || !form.almacenId) {
      setError("Cliente y almacén son requeridos");
      return;
    }
    try {
      const data = {
        fechaPedido: form.fechaPedido || new Date().toISOString().split("T")[0],
        estadoPedido: form.estadoPedido,
        usuario: { id: form.usuarioId },
        almacen: { id: form.almacenId },
      };

      if (editing) {
        await editPedido(editing.id, data);
        setSuccess("Pedido actualizado exitosamente");
      } else {
        await addPedido(data);
        setSuccess("Pedido creado exitosamente");
      }

      setEditing(null);
      setForm({ fechaPedido: "", estadoPedido: "PENDIENTE", usuarioId: "", almacenId: "" });
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = p => {
    setEditing(p);
    setForm({
      fechaPedido: p.fechaPedido,
      estadoPedido: p.estadoPedido,
      usuarioId: p.usuario?.id || "",
      almacenId: p.almacen?.id || ""
    });
    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este pedido?")) {
      try {
        await removePedido(id);
        setSuccess("Pedido eliminado exitosamente");
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setForm({ fechaPedido: "", estadoPedido: "PENDIENTE", usuarioId: "", almacenId: "" });
    setError("");
    setSuccess("");
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'fechaPedido', label: 'Fecha' },
    { key: 'estadoPedido', label: 'Estado' },
    { key: 'usuario', label: 'Cliente', render: (row) => row?.nombre || 'N/A' },
    { key: 'almacen', label: 'Almacén', render: (row) => row?.nombre || 'N/A' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Pedidos</h2>
          <p>Gestiona los pedidos de los clientes</p>
        </div>
        <button 
          className={styles.btnNew} 
          onClick={() => {
            setEditing(null);
            setForm({ fechaPedido: "", estadoPedido: "PENDIENTE", usuarioId: "", almacenId: "" });
            setError("");
            setSuccess("");
          }}
        >
          + Nuevo Pedido
        </button>
      </div>

      {error && <div className={styles.errorAlert}>{error}</div>}
      {success && <div className={styles.successAlert}>{success}</div>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <input 
            type="date" 
            name="fechaPedido" 
            value={form.fechaPedido} 
            onChange={handleChange} 
          />
          <select 
            name="estadoPedido" 
            value={form.estadoPedido} 
            onChange={handleChange}
          >
            <option value="PENDIENTE">Pendiente</option>
            <option value="CONFIRMADO">Confirmado</option>
            <option value="EN_PREPARACION">En preparación</option>
            <option value="ENVIADO">Enviado</option>
            <option value="ENTREGADO">Entregado</option>
            <option value="CANCELADO">Cancelado</option>
          </select>
          <select 
            name="usuarioId" 
            value={form.usuarioId} 
            onChange={handleChange}
            required
            disabled={clientesLoading}
          >
            <option value="">Selecciona un cliente {clientesLoading && '(cargando...)'}</option>
            {clientes?.map(c => <option key={c.idUsuario || c.id} value={c.idUsuario || c.id}>{c.nombre}</option>)}
          </select>
          <select 
            name="almacenId" 
            value={form.almacenId} 
            onChange={handleChange}
            required
            disabled={almacenesLoading}
          >
            <option value="">Selecciona un almacén {almacenesLoading && '(cargando...)'}</option>
            {almacenes?.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
          </select>
        </div>
        <div className={styles.formActions}>
          <button type="submit" className={styles.btnSubmit}>
            {editing ? "Actualizar Pedido" : "Crear Pedido"}
          </button>
          {editing && (
            <button type="button" className={styles.btnCancel} onClick={handleCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <Table 
        columns={columns}
        data={pedidos}
        onEdit={handleEdit}
        onDelete={(row) => handleDelete(row.id)}
        loading={loading}
        emptyMessage="No hay pedidos disponibles"
      />
    </div>
  );
}