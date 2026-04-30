import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import styles from "./ShoppingCart.module.css";

export default function ShoppingCart() {
  const { cartItems, totalPrice, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("El carrito está vacío");
      return;
    }
    alert("¡Compra realizada! Total: Q" + totalPrice.toFixed(2));
    clearCart();
    setIsOpen(false);
  };

  return (
    <div className={styles.cartContainer}>
      {/* Botón de carrito flotante */}
      <button
        className={styles.cartButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        🛒
        {cartItems.length > 0 && (
          <span className={styles.cartBadge}>{cartItems.length}</span>
        )}
      </button>

      {/* Modal del carrito */}
      {isOpen && (
        <div className={styles.cartModal}>
          <div className={styles.cartContent}>
            <div className={styles.cartHeader}>
              <h2>Tu Carrito de Compras</h2>
              <button
                className={styles.closeBtn}
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className={styles.emptyCart}>
                <p>Tu carrito está vacío</p>
                <p>Agrega productos para comenzar tu compra</p>
              </div>
            ) : (
              <>
                <div className={styles.cartItems}>
                  {cartItems.map((item) => (
                    <div key={item.idProducto} className={styles.cartItem}>
                      <div className={styles.itemImage}>
                        <img
                          src={
                            item.imagen ||
                            "https://via.placeholder.com/80x80?text=No+Imagen"
                          }
                          alt={item.nombre}
                        />
                      </div>

                      <div className={styles.itemDetails}>
                        <h4>{item.nombre}</h4>
                        <p>Q{item.precio?.toFixed(2) || "0.00"}</p>
                      </div>

                      <div className={styles.itemQuantity}>
                        <button
                          onClick={() =>
                            updateQuantity(item.idProducto, item.cantidad - 1)
                          }
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={item.cantidad}
                          onChange={(e) =>
                            updateQuantity(
                              item.idProducto,
                              parseInt(e.target.value) || 1
                            )
                          }
                          min="1"
                        />
                        <button
                          onClick={() =>
                            updateQuantity(item.idProducto, item.cantidad + 1)
                          }
                        >
                          +
                        </button>
                      </div>

                      <div className={styles.itemTotal}>
                        <span>Q{(item.precio * item.cantidad).toFixed(2)}</span>
                      </div>

                      <button
                        className={styles.removeBtn}
                        onClick={() => removeFromCart(item.idProducto)}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>

                <div className={styles.cartFooter}>
                  <div className={styles.totalSection}>
                    <span>Total:</span>
                    <span className={styles.totalPrice}>
                      Q{totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className={styles.cartActions}>
                    <button
                      className={styles.btnClear}
                      onClick={() => {
                        if (
                          window.confirm(
                            "¿Estás seguro de que deseas vaciar el carrito?"
                          )
                        ) {
                          clearCart();
                        }
                      }}
                    >
                      Vaciar Carrito
                    </button>
                    <button
                      className={styles.btnCheckout}
                      onClick={handleCheckout}
                    >
                      Comprar Ahora
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Overlay para cerrar modal */}
          <div
            className={styles.overlay}
            onClick={() => setIsOpen(false)}
          ></div>
        </div>
      )}
    </div>
  );
}
