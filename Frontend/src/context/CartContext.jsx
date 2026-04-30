import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Error al cargar carrito:", error);
      localStorage.removeItem("cart");
    }
  }, []);

  // Actualizar totalPrice cuando cambien cartItems
  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.precio * item.cantidad,
      0
    );
    setTotalPrice(total);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Agregar producto al carrito
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.idProducto === product.idProducto
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.idProducto === product.idProducto
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, cantidad: 1 }];
      }
    });
  };

  // Eliminar producto del carrito
  const removeFromCart = (idProducto) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.idProducto !== idProducto)
    );
  };

  // Actualizar cantidad del producto
  const updateQuantity = (idProducto, cantidad) => {
    if (cantidad <= 0) {
      removeFromCart(idProducto);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.idProducto === idProducto
          ? { ...item, cantidad }
          : item
      )
    );
  };

  // Vaciar carrito
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  // Obtener cantidad de items
  const getCartCount = () => {
    return cartItems.reduce((sum, item) => sum + item.cantidad, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
