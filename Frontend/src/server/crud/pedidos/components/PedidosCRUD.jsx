import { useState } from "react";
import { usePedidos } from "../hooks/usePedidos";
import { useAlmacenes } from "../../almacenes/hooks/useAlmacenes";
import { useClientes } from "../../clientes/hooks/useClientes";
import styles from './PedidosCRUD.module.css';

export default function PedidosCRUD() {
  const { pedidos, loading, addPedido, editPedido, removePedido } = usePedidos();
  const { almacenes } = useAlmacenes();
  const { clientes } = useClientes();
  const [form, setForm] = useState({ fechaPedido: "", estadoPedido: "PENDIENTE", usuarioId: "", almacenId: "" });
  const [editing, setEditing] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      fechaPedido: form.fechaPedido || new Date().toISOString().split("T")[0],
      estadoPedido: form.estadoPedido,
      usuario: { id: form.usuarioId },
      almacen: { id: form.almacenId },
    };

    if (editing) { editPedido(editing.id, data); setEditing(null); }
    else addPedido(data);

    setForm({ fechaPedido: "", estadoPedido: "PENDIENTE", usuarioId: "", almacenId: "" });
  };

  const handleEdit = p => {
    setEditing(p);
    setForm({
      fechaPedido: p.fechaPedido,
      estadoPedido: p.estadoPedido,
      usuarioId: p.usuario?.id || "",
      almacenId: p.almacen?.id || ""
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>CRUD Pedidos</h2>
          <p>Gestiona los pedidos de los clientes</p>
        </div>
        <button className={styles.btnNew} onClick={() => setEditing({ id: null })}>
          + Nuevo Pedido
        </button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <input type="date" name="fechaPedido" value={form.fechaPedido} onChange={handleChange} />
          <select name="estadoPedido" value={form.estadoPedido} onChange={handleChange}>
            <option value="PENDIENTE">Pendiente</option>
            <option value="CONFIRMADO">Confirmado</option>
            <option value="EN_PREPARACION">En preparación</option>
            <option value="ENVIADO">Enviado</option>
            <option value="ENTREGADO">Entregado</option>
            <option value="CANCELADO">Cancelado</option>
          </select>
          <select name="usuarioId" value={form.usuarioId} onChange={handleChange}>
            <option value="">Selecciona un cliente</option>
            {clientes?.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>
          <select name="almacenId" value={form.almacenId} onChange={handleChange}>
            <option value="">Selecciona un almacén</option>
            {almacenes?.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
          </select>
        </div>
        <button type="submit">{editing ? "Actualizar" : "Crear"}</button>
      </form>

      {loading ? <p className={styles.loading}>Cargando...</p> :
        <ul className={styles.lista}>
          {pedidos.map(p => (
            <li key={p.id} className={styles.item}>
              <span>{p.fechaPedido} - {p.estadoPedido} - {p.usuario?.nombre} - {p.almacen?.nombre}</span>
              <div>
                <button onClick={() => handleEdit(p)}>Editar</button>
                <button onClick={() => removePedido(p.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}