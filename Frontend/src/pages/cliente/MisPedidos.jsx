import { useContext, useEffect } from "react";
import { useClientPedidos } from "../../server/crud/pedidos/hooks/useClientPedidos";
import { AuthContext } from "../../context/AuthContext";
import Cargando from "../../components/structural/cargando/Cargando";
import styles from './MisPedidos.module.css';

export default function MisPedidos() {
  const { user } = useContext(AuthContext);
  const { pedidos, loading, error, fetchPedidos } = useClientPedidos();

  useEffect(() => {
    if (user?.id) {
      fetchPedidos();
    }
  }, [user]);

  if (loading) return <Cargando />;

  const ESTADO_CONFIG = {
    PENDIENTE:      { color: "#c8a96e", label: "Pendiente",      icon: "⏳" },
    CONFIRMADO:     { color: "#60a5fa", label: "Confirmado",     icon: "✓"  },
    EN_PREPARACION: { color: "#a78bfa", label: "En preparación", icon: "⚙" },
    ENVIADO:        { color: "#38bdf8", label: "Enviado",        icon: "→"  },
    ENTREGADO:      { color: "#4ade80", label: "Entregado",      icon: "✓"  },
    CANCELADO:      { color: "#f87171", label: "Cancelado",      icon: "✕"  },
  };

  const getEstado = (estado) =>
    ESTADO_CONFIG[estado] || { color: "#888", label: estado, icon: "·" };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Cuenta · Historial</span>
        <h1>Mis <em>Pedidos</em></h1>
        <p>Historial y estado de tus compras</p>
      </div>

      {error && <div className={styles.errorAlert}>{error}</div>}

      {pedidos.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>◻</div>
          <h2>Sin pedidos aún</h2>
          <p>Cuando realices tu primer pedido aparecerá aquí.</p>
        </div>
      ) : (
        <div className={styles.pedidosList}>
          {pedidos.map((pedido, index) => {
            const cfg = getEstado(pedido.estadoPedido);
            const total = pedido.lineas
              ?.reduce((sum, l) => sum + l.precioUnitarioVenta * l.cantidad, 0)
              .toFixed(2) ?? "0.00";

            return (
              <div key={pedido.id} className={styles.pedidoCard}>
                {/* Número de índice decorativo */}
                <span className={styles.orderIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className={styles.cardHeader}>
                  <div className={styles.orderNumber}>
                    <h3>Pedido <em>#{pedido.id}</em></h3>
                    <p className={styles.fecha}>
                      {new Date(pedido.fechaPedido).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div
                    className={styles.estado}
                    style={{ borderColor: cfg.color, color: cfg.color }}
                  >
                    <span className={styles.estadoIcon}>{cfg.icon}</span>
                    {cfg.label}
                  </div>
                </div>

                <div className={styles.cardContent}>
                  {pedido.lineas?.length > 0 ? (
                    <div className={styles.productos}>
                      <p className={styles.productosLabel}>Productos</p>
                      <ul>
                        {pedido.lineas.map((linea, idx) => (
                          <li key={idx}>
                            <span className={styles.productoNombre}>
                              {linea.producto?.nombre || `Producto #${linea.productoId}`}
                            </span>
                            <span className={styles.productoDetalles}>
                              ×{linea.cantidad}
                              <strong>
                                ${(linea.precioUnitarioVenta * linea.cantidad).toFixed(2)}
                              </strong>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className={styles.sinDetalles}>Detalles no disponibles</p>
                  )}

                  {pedido.almacen && (
                    <div className={styles.almacen}>
                      <span className={styles.almacenLabel}>Almacén</span>
                      {pedido.almacen.nombre}
                    </div>
                  )}
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.total}>
                    <span>Total del pedido</span>
                    <strong>${total}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}