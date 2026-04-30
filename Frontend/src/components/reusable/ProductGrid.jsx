import { useEffect, useState } from "react";
import { getProductos } from "../../server/crud/productos/services/productoService";
import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";

export default function ProductGrid() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const data = await getProductos();
        // getProductos retorna {data: [...]} así que extraemos el array
        setProductos(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error("Error fetching productos:", err);
        setError("No se pudieron cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <p>No hay productos disponibles en este momento</p>
      </div>
    );
  }

  return (
    <div className={styles.productGridContainer}>
      <h2 className={styles.title}>Nuestros Productos</h2>
      <div className={styles.productsGrid}>
        {productos.map((producto) => (
          <ProductCard key={producto.idProducto} product={producto} />
        ))}
      </div>
    </div>
  );
}
