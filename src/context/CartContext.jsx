import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("vendora-cart");

      if (!savedCart) {
        return [];
      }

      const parsedCart = JSON.parse(savedCart);

      if (!Array.isArray(parsedCart)) {
        return [];
      }

      return parsedCart.filter(
        (item) =>
          item &&
          item.id &&
          typeof item.price === "number" &&
          typeof item.quantity === "number"
      );
    } catch (error) {
      console.error("Failed to load Vendora cart:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        "vendora-cart",
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error("Failed to save Vendora cart:", error);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    if (!product) return;

    const stockCount =
      typeof product.stockCount === "number"
        ? product.stockCount
        : 99;

    if (
      product.stock === "Out of Stock" ||
      stockCount <= 0
    ) {
      return;
    }

    const safeQuantity = Math.max(
      1,
      Math.min(Number(quantity) || 1, stockCount)
    );

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) => {
          if (item.id !== product.id) {
            return item;
          }

          const maximumStock =
            typeof item.stockCount === "number"
              ? item.stockCount
              : stockCount;

          return {
            ...item,
            quantity: Math.min(
              item.quantity + safeQuantity,
              maximumStock
            ),
          };
        });
      }

      return [
        ...currentItems,
        {
          id: product.id,
          name: product.name,
          vendor: product.vendor,
          vendorId: product.vendorId,
          category: product.category,
          subCategory: product.subCategory,
          price: product.price,
          oldPrice: product.oldPrice || product.price,
          image: product.image,
          stock: product.stock,
          stockCount,
          quantity: safeQuantity,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== productId
      )
    );
  };

  const increaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== productId) {
          return item;
        }

        const maximumStock =
          typeof item.stockCount === "number"
            ? item.stockCount
            : 99;

        if (item.quantity >= maximumStock) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== productId) {
          return item;
        }

        return {
          ...item,
          quantity: Math.max(
            1,
            item.quantity - 1
          ),
        };
      })
    );
  };

  const updateQuantity = (productId, quantity) => {
    const requestedQuantity = Number(quantity);

    if (!Number.isFinite(requestedQuantity)) {
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== productId) {
          return item;
        }

        const maximumStock =
          typeof item.stockCount === "number"
            ? item.stockCount
            : 99;

        const safeQuantity = Math.max(
          1,
          Math.min(
            Math.floor(requestedQuantity),
            maximumStock
          )
        );

        return {
          ...item,
          quantity: safeQuantity,
        };
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isInCart = (productId) => {
    return cartItems.some(
      (item) => item.id === productId
    );
  };

  const getItemQuantity = (productId) => {
    const item = cartItems.find(
      (cartItem) =>
        cartItem.id === productId
    );

    return item?.quantity || 0;
  };

  const totals = useMemo(() => {
    const totalItems = cartItems.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

    const subtotal = cartItems.reduce(
      (total, item) =>
        total +
        item.price * item.quantity,
      0
    );

    const totalSavings = cartItems.reduce(
      (total, item) => {
        const originalPrice =
          item.oldPrice || item.price;

        const savingPerItem = Math.max(
          0,
          originalPrice - item.price
        );

        return (
          total +
          savingPerItem *
            item.quantity
        );
      },
      0
    );

    const deliveryCharge =
      subtotal === 0
        ? 0
        : subtotal >= 999
        ? 0
        : 99;

    const tax = Math.round(
      subtotal * 0.05
    );

    const grandTotal =
      subtotal +
      deliveryCharge +
      tax;

    return {
      totalItems,
      subtotal,
      totalSavings,
      deliveryCharge,
      tax,
      grandTotal,
    };
  }, [cartItems]);

  const value = {
    cartItems,

    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    updateQuantity,
    clearCart,

    isInCart,
    getItemQuantity,

    totalItems: totals.totalItems,
    subtotal: totals.subtotal,
    totalSavings:
      totals.totalSavings,
    deliveryCharge:
      totals.deliveryCharge,
    tax: totals.tax,
    grandTotal:
      totals.grandTotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}