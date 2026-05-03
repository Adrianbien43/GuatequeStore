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

  const getEstadoColor = (estado) => {
    const colores = {
      PENDIENTE: "#ff9800",
      CONFIRMADO: "#2196f3",
      EN_PREPARACION: "#9c27b0",
      ENVIADO: "#03a9f4",
      ENTREGADO: "#4caf50",
      CANCELADO: "#f44336"
    };
    return colores[estado] || "#999";
  };

  const getEstadoEmoji = (estado) => {
    const emojis = {
      PENDIENTE: "⏳",
      CONFIRMADO: "✅",
      EN_PREPARACION: "⚙️",
      ENVIADO: "🚚",
      ENTREGADO: "📦",
      CANCELADO: "❌"
    };
    return emojis[estado] || "📋";
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Mis Pedidos</h1>
        <p>Historial y estado de tus compras</p>
      </div>

      {error && (
        <div className={styles.errorAlert}>{error}</div>
      )}

      {pedidos.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🛒</div>
          <h2>No tienes pedidos</h2>
          <p>Aún no has realizado ningún pedido. ¡Comienza a comprar ahora!</p>
        </div>
      ) : (
        <div className={styles.pedidosList}>
          {pedidos.map(pedido => (
            <div key={pedido.id} className={styles.pedidoCard}>
              <div className={styles.cardHeader}>
                <div className={styles.orderNumber}>
                  <h3>Pedido #{pedido.id}</h3>
                  <p className={styles.fecha}>
                    {new Date(pedido.fechaPedido).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div 
                  className={styles.estado}
                  style={{ borderColor: getEstadoColor(pedido.estadoPedido) }}
                >
                  <span style={{ color: getEstadoColor(pedido.estadoPedido) }}>
                    {getEstadoEmoji(pedido.estadoPedido)} {pedido.estadoPedido}
                  </span>
                </div>
              </div>

              <div className={styles.cardContent}>
                {pedido.lineas && pedido.lineas.length > 0 ? (
                  <div className={styles.productos}>
                    <h4>Productos:</h4>
                    <ul>
                      {pedido.lineas.map((linea, idx) => (
                        <li key={idx}>
                          <span className={styles.productoNombre}>
                            {linea.producto?.nombre || `Producto ID: ${linea.productoId}`}
                          </span>
                          <span className={styles.productoDetalles}>
                            x{linea.cantidad} - ${(linea.precioUnitarioVenta * linea.cantidad).toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className={styles.sinDetalles}>Detalles del pedido no disponibles</p>
                )}

                {pedido.almacen && (
                  <div className={styles.almacen}>
                    <strong>Almacén:</strong> {pedido.almacen.nombre}
                  </div>
                )}
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.total}>
                  <span>Total:</span>
                  <strong>
                    ${pedido.lineas?.reduce((sum, linea) => sum + (linea.precioUnitarioVenta * linea.cantidad), 0).toFixed(2) || "0.00"}
                  </strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}