import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.nombre} agregado al carrito!`);
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <img
          src={product.imagen || "https://via.placeholder.com/280x300?text=Sin+Imagen"}
          alt={product.nombre}
          className={styles.productImage}
        />
        <div className={styles.overlay}>
          <button
            className={styles.btnAddToCart}
            onClick={handleAddToCart}
          >
            Añadir al carrito
          </button>
        </div>
      </div>

      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.nombre}</h3>

        <p className={styles.productDescription}>
          {product.descripcion || "Producto sin descripción"}
        </p>

        <div className={styles.productFooter}>
          <span className={styles.productPrice}>
            Q{product.precio?.toFixed(2) || "0.00"}
          </span>
          <span className={styles.stock}>
            Stock: {product.stock || 0}
          </span>
        </div>
      </div>
    </div>
  );
}
