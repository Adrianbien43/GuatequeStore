import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ProductGrid from "../../components/reusable/ProductGrid";
import ShoppingCart from "../../components/reusable/ShoppingCart";
import styles from "./WelcomeClient.module.css";

export default function WelcomeClient() {
  const { user } = useContext(AuthContext);

  return (
    <div className={styles.welcomeContainer}>
      {/* Header de bienvenida */}
      <div className={styles.welcomeHeader}>
        <h1>¡Bienvenido de nuevo, {user?.nombre || "Cliente"}! 🎉</h1>
        <p>Explora nuestras ofertas exclusivas y novedades</p>
      </div>

      {/* Grid de productos */}
      <ProductGrid />

      {/* Carrito de compras flotante */}
      <ShoppingCart />
    </div>
  );
}

