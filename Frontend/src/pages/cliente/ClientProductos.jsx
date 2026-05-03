import { useState, useContext, useEffect } from "react";
import { useClientProductos } from "../../server/crud/productos/hooks/useClientProductos";
import { useClientPedidos } from "../../server/crud/pedidos/hooks/useClientPedidos";
import { AuthContext } from "../../context/AuthContext";
import Cargando from "../../components/structural/cargando/Cargando";
import styles from './ClientProductos.module.css';

export default function ClientProductos() {
  const { user } = useContext(AuthContext);
  const { productos, loading, error: productosError } = useClientProductos();
  const { crearPedido, error: pedidosError } = useClientPedidos();
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [creatingOrder, setCreatingOrder] = useState(false);

  console.log("=== DIAGNÓSTICO DE AUTENTICACIÓN ===");
  console.log("1. Contexto Auth - user completo:", user);
  console.log("2. ID del usuario:", user?.id);
  console.log("3. Token en localStorage:", localStorage.getItem("token"));
  console.log("4. User en localStorage:", localStorage.getItem("user"));
  console.log("=====================================");

  useEffect(() => {
    console.log("useEffect - Verificando autenticación al montar componente");
    console.log("Usuario actual:", user);
  }, [user]);

  if (loading) return <Cargando />;

  const handleAddToCart = (producto) => {
    console.log("Producto seleccionado:", producto);
    setSelectedProduct(producto);
    setCantidad(1);
    setError("");
    setSuccess("");
  };

  const handleMakePedido = async () => {
    console.log("=== INTENTANDO CREAR PEDIDO ===");
    console.log("Usuario en contexto al crear pedido:", user);
    console.log("ID del usuario:", user?.id);
    console.log("Producto seleccionado:", selectedProduct);
    console.log("Cantidad:", cantidad);
    
    if (!selectedProduct || cantidad < 1) {
      console.log("ERROR: No hay producto seleccionado o cantidad inválida");
      setError("Por favor selecciona una cantidad válida");
      return;
    }

    if (!user) {
      console.log("ERROR CRÍTICO: user es null o undefined");
      setError("Usuario no autenticado. Por favor inicia sesión.");
      return;
    }

    if (!user.id) {
      console.log("ERROR CRÍTICO: user existe pero no tiene id. user:", user);
      setError("Usuario no autenticado. ID de usuario no encontrado.");
      return;
    }

    console.log("VALIDACIÓN PASADA - Usuario autenticado correctamente");

    setCreatingOrder(true);
    setError("");
    setSuccess("");

    try {
      // ✅ ESTRUCTURA CORREGIDA - Objetos anidados como espera el backend
      const pedidoData = {
        usuario: { id: user.id },           // ← Objeto usuario con id
        almacen: { id: 1 },                 // ← Objeto almacen con id
        fechaPedido: new Date().toISOString().split('T')[0],
        estadoPedido: "PENDIENTE",
        lineas: [
          {
            productoId: selectedProduct.id,
            cantidad: cantidad,
            precioUnitarioVenta: selectedProduct.precioUnitario
          }
        ]
      };
      
      console.log("Datos del pedido a enviar:", pedidoData);
      console.log("Llamando a crearPedido con:", pedidoData);
      
      const nuevoPedido = await crearPedido(pedidoData);
      
      console.log("RESPUESTA DEL SERVIDOR - Pedido creado exitosamente:", nuevoPedido);
      
      setSuccess(`¡Pedido #${nuevoPedido.id} creado! ${selectedProduct.nombre} x${cantidad} ha sido añadido.`);
      setSelectedProduct(null);
      setCantidad(1);
      
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (err) {
      console.error("ERROR AL CREAR PEDIDO - Detalles completos:", err);
      console.error("Mensaje de error:", err.message);
      console.error("Respuesta del servidor:", err.response);
      console.error("Status code:", err.response?.status);
      console.error("Data del error:", err.response?.data);
      setError(err.message || "Error al realizar el pedido");
    } finally {
      setCreatingOrder(false);
      console.log("=== FIN DEL INTENTO DE CREAR PEDIDO ===");
    }
  };

  const handleCloseModal = () => {
    console.log("Cerrando modal");
    setSelectedProduct(null);
    setCantidad(1);
    setError("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Catálogo de Productos</h1>
        <p>Explora nuestros productos y realiza tus pedidos</p>
      </div>

      {(productosError || pedidosError) && (
        <div className={styles.errorAlert}>{productosError || pedidosError}</div>
      )}

      {success && (
        <div className={styles.successAlert}>{success}</div>
      )}

      {productos.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No hay productos disponibles en este momento</p>
        </div>
      ) : (
        <div className={styles.productsGrid}>
          {productos.map(producto => (
            <div key={producto.id} className={styles.productCard}>
              <div className={styles.productImage}>
                {producto.imagen ? (
                  <img src={producto.imagen} alt={producto.nombre} />
                ) : (
                  <div className={styles.imagePlaceholder}>📦</div>
                )}
              </div>
              <div className={styles.productInfo}>
                <h3>{producto.nombre}</h3>
                <div className={styles.productDetails}>
                  <p><strong>Marca:</strong> {producto.marca || "N/A"}</p>
                  <p><strong>Categoría:</strong> {producto.categoria}</p>
                  <p><strong>Talla:</strong> {producto.talla || "Única"}</p>
                  <p><strong>Género:</strong> {producto.genero}</p>
                </div>
                <div className={styles.productPrice}>
                  <span className={styles.price}>${producto.precioUnitario?.toFixed(2) || "N/A"}</span>
                </div>
                <button 
                  className={styles.btnPedir}
                  onClick={() => handleAddToCart(producto)}
                >
                  🛒 Pedir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeBtn} onClick={handleCloseModal}>✕</button>
            
            <h2>Confirmar Pedido</h2>
            
            <div className={styles.modalProduct}>
              {selectedProduct.imagen ? (
                <img src={selectedProduct.imagen} alt={selectedProduct.nombre} />
              ) : (
                <div className={styles.imagePlaceholder}>📦</div>
              )}
              <div className={styles.modalInfo}>
                <h3>{selectedProduct.nombre}</h3>
                <p><strong>Marca:</strong> {selectedProduct.marca}</p>
                <p><strong>Categoría:</strong> {selectedProduct.categoria}</p>
                <p><strong>Talla:</strong> {selectedProduct.talla || "Única"}</p>
                <p><strong>Precio unitario:</strong> ${selectedProduct.precioUnitario?.toFixed(2)}</p>
              </div>
            </div>

            {error && <div className={styles.errorAlert}>{error}</div>}

            <div className={styles.quantitySection}>
              <label htmlFor="cantidad">Cantidad:</label>
              <div className={styles.quantityInput}>
                <button 
                  type="button"
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  disabled={cantidad <= 1}
                >
                  −
                </button>
                <input 
                  id="cantidad"
                  type="number" 
                  min="1" 
                  value={cantidad}
                  onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                />
                <button 
                  type="button"
                  onClick={() => setCantidad(cantidad + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className={styles.totalPrice}>
              <p>Total: <strong>${(selectedProduct.precioUnitario * cantidad).toFixed(2)}</strong></p>
            </div>

            <div className={styles.modalActions}>
              <button 
                className={styles.btnCancel}
                onClick={handleCloseModal}
                disabled={creatingOrder}
              >
                Cancelar
              </button>
              <button 
                className={styles.btnConfirm}
                onClick={handleMakePedido}
                disabled={creatingOrder}
              >
                {creatingOrder ? "Procesando..." : "Confirmar Pedido"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}