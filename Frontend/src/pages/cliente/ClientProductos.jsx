import { useState, useContext, useEffect } from "react";
import { useClientProductos } from "../../server/crud/productos/hooks/useClientProductos";
import { useClientPedidos } from "../../server/crud/pedidos/hooks/useClientPedidos";
import { AuthContext } from "../../context/AuthContext";
import Cargando from "../../components/structural/cargando/Cargando";
import styles from './ClientProductos.module.css';

// ─── IMÁGENES REALES POR CATEGORÍA Y GÉNERO (Unsplash, sin API key) ───────────
const PRODUCT_IMAGES = {
  CAMISETA: {
    HOMBRE: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    ],
    MUJER: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80",
      "https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=600&q=80",
    ],
    UNISEX: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80",
      "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=600&q=80",
    ],
  },
  PANTALON: {
    HOMBRE: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
    ],
    MUJER: [
      "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=600&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
    ],
    UNISEX: [
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=600&q=80",
    ],
  },
  SUDADERA: {
    HOMBRE: [
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&q=80",
    ],
    MUJER: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
      "https://images.unsplash.com/photo-1584117091040-db48b0ae3b34?w=600&q=80",
    ],
    UNISEX: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
    ],
  },
  GORRA: {
    HOMBRE: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80",
      "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=600&q=80",
    ],
    MUJER: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
    ],
    UNISEX: [
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&q=80",
    ],
  },
  ZAPATOS: {
    HOMBRE: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
    ],
    MUJER: [
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=600&q=80",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
    ],
    UNISEX: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
    ],
  },
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80";

const CATEGORIAS = ["TODOS", "CAMISETA", "PANTALON", "SUDADERA", "GORRA", "ZAPATOS"];

/** Devuelve una imagen real según categoría, género e id del producto */
function getProductImage(categoria, genero, id) {
  if (!categoria) return FALLBACK_IMAGE;
  const catImages = PRODUCT_IMAGES[categoria.toUpperCase()];
  if (!catImages) return FALLBACK_IMAGE;
  const genderKey = genero?.toUpperCase();
  const pool =
    catImages[genderKey] ||
    catImages["UNISEX"] ||
    catImages["HOMBRE"] ||
    Object.values(catImages)[0];
  return pool[id % pool.length];
}

export default function ClientProductos() {
  const { user } = useContext(AuthContext);
  const { productos, loading, error: productosError } = useClientProductos();
  const { crearPedido, error: pedidosError } = useClientPedidos();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [activeFilter, setActiveFilter] = useState("TODOS");

  if (loading) return <Cargando />;

  const productosFiltrados =
    activeFilter === "TODOS"
      ? productos
      : productos.filter((p) => p.categoria === activeFilter);

  const handleSelectProduct = (producto) => {
    setSelectedProduct(producto);
    setCantidad(1);
    setError("");
    setSuccess("");
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setCantidad(1);
    setError("");
  };

  const handleMakePedido = async () => {
    if (!selectedProduct || cantidad < 1) {
      setError("Por favor selecciona una cantidad válida.");
      return;
    }
    if (!user?.id) {
      setError("Usuario no autenticado. Por favor inicia sesión.");
      return;
    }

    setCreatingOrder(true);
    setError("");

    try {
      // ✅ ESTRUCTURA LIMPIA: solo los campos que el backend necesita
      const pedidoData = {
        usuario: { id: user.id },
        almacen: { id: 1 },
        fechaPedido: new Date().toISOString().split("T")[0],
        estadoPedido: "PENDIENTE",
        lineas: [
          {
            productoId: selectedProduct.id,
            cantidad: cantidad,
            precioUnitarioVenta: selectedProduct.precioUnitario,
          },
        ],
      };

      console.log("📦 Enviando pedido:", JSON.stringify(pedidoData, null, 2));

      const nuevoPedido = await crearPedido(pedidoData);
      setSuccess(
        `✓ Pedido #${nuevoPedido.id} creado — ${selectedProduct.nombre} × ${cantidad}`
      );
      handleCloseModal();
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setError(err.message || "Error al realizar el pedido.");
    } finally {
      setCreatingOrder(false);
    }
  };

  const total = selectedProduct ? selectedProduct.precioUnitario * cantidad : 0;

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <span className={styles.eyebrow}>Temporada 2026 · Nueva colección</span>
        <h1>Catálogo <em>Premium</em></h1>
        <p>Piezas seleccionadas para tu estilo. Realiza tu pedido en segundos.</p>
      </div>

      {/* FILTROS */}
      <div className={styles.filtersRow}>
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${activeFilter === cat ? styles.filterBtnActive : ""}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ALERTAS */}
      {(productosError || pedidosError) && (
        <div className={styles.errorAlert}>{productosError || pedidosError}</div>
      )}
      {success && <div className={styles.successAlert}>{success}</div>}

      {/* GRID */}
      {productosFiltrados.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No hay productos en esta categoría por el momento.</p>
        </div>
      ) : (
        <div className={styles.productsGrid}>
          {productosFiltrados.map((producto) => {
            const imgSrc =
              producto.imagen ||
              getProductImage(producto.categoria, producto.genero, producto.id);

            return (
              <div key={producto.id} className={styles.productCard}>
                <div className={styles.productImage}>
                  <img src={imgSrc} alt={producto.nombre} loading="lazy" />
                  <span className={styles.catBadge}>{producto.categoria}</span>
                  <span className={styles.genderBadge}>{producto.genero}</span>
                </div>
                <div className={styles.productInfo}>
                  <p className={styles.productBrand}>{producto.marca || "—"}</p>
                  <h3>{producto.nombre}</h3>
                  <div className={styles.productDetails}>
                    <p><strong>Talla:</strong> {producto.talla || "Única"}</p>
                    <p><strong>Género:</strong> {producto.genero}</p>
                  </div>
                  <div className={styles.productPrice}>
                    <span className={styles.price}>
                      ${producto.precioUnitario?.toFixed(2) ?? "—"}
                    </span>
                  </div>
                  <button
                    className={styles.btnPedir}
                    onClick={() => handleSelectProduct(producto)}
                  >
                    Pedir
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL */}
      {selectedProduct && (
        <div
          className={styles.modal}
          onClick={(e) => { if (e.target === e.currentTarget) handleCloseModal(); }}
        >
          <div className={styles.modalContent}>
            <button className={styles.closeBtn} onClick={handleCloseModal}>✕</button>

            <div className={styles.modalProduct}>
              <div className={styles.modalImageWrap}>
                <img
                  src={
                    selectedProduct.imagen ||
                    getProductImage(selectedProduct.categoria, selectedProduct.genero, selectedProduct.id)
                  }
                  alt={selectedProduct.nombre}
                />
              </div>
              <div className={styles.modalInfo}>
                <p className={styles.modalEyebrow}>
                  {selectedProduct.categoria} · {selectedProduct.marca}
                </p>
                <h3>{selectedProduct.nombre}</h3>
                <div className={styles.modalDetails}>
                  {[
                    ["Marca", selectedProduct.marca || "—"],
                    ["Talla", selectedProduct.talla || "Única"],
                    ["Género", selectedProduct.genero],
                    ["Precio unit.", `$${selectedProduct.precioUnitario?.toFixed(2)}`],
                  ].map(([label, value]) => (
                    <div key={label} className={styles.detailItem}>
                      <span className={styles.detailLabel}>{label}</span>
                      <span className={styles.detailValue}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {error && <div className={styles.errorAlert}>{error}</div>}

            <div className={styles.quantitySection}>
              <label htmlFor="cantidad">Cantidad</label>
              <div className={styles.quantityInput}>
                <button
                  type="button"
                  onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                  disabled={cantidad <= 1}
                >
                  −
                </button>
                <input
                  id="cantidad"
                  type="number"
                  min="1"
                  value={cantidad}
                  onChange={(e) =>
                    setCantidad(Math.max(1, parseInt(e.target.value) || 1))
                  }
                />
                <button
                  type="button"
                  onClick={() => setCantidad((c) => c + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className={styles.totalPrice}>
              <p>Total: <strong>${total.toFixed(2)}</strong></p>
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