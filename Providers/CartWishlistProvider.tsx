"use client";

import { getFromLocalStorage, saveToLocalStorage } from "@/lib/utils";
import { TCartItem, TCartWishlistContext, TProduct } from "@/types";
import {
  createContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

export const CartWishlistContext = createContext<TCartWishlistContext | null>(
  null
);

export function CartWishlistProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<TCartItem[]>([]);
  const [wishlist, setWishlist] = useState<TProduct[]>([]);

  /* ------------------------------
      Load From LocalStorage
  ------------------------------ */
  useEffect(() => {
    const storedCart = getFromLocalStorage("cart");
    const storedWishlist = getFromLocalStorage("wishlist");

    if (storedCart) setCart(storedCart);
    if (storedWishlist) setWishlist(storedWishlist);
  }, []);

  /* ------------------------------
      CART FUNCTIONS
  ------------------------------ */

  const addToCart = useCallback((item: TProduct) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);

      if (exists) {
        const updateQuantity = prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
        saveToLocalStorage("cart", updateQuantity);

        return updateQuantity;
      }

      const newData = [...prev, { ...item, quantity: 1 }];
      saveToLocalStorage("cart", newData);

      return newData;
    });
  }, []);

  const updateCartQuantity = useCallback(
    (id: string | number, quantity: number) => {
      setCart((prev) => {
        const updatedData = prev.map((item) =>
          item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
        );
        saveToLocalStorage("cart", updatedData);

        return updatedData;
      });
    },
    []
  );

  const decreaseCartQuantity = useCallback((id: string | number) => {
    setCart((prev) => {
      const updatedData = prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);

      saveToLocalStorage("cart", updatedData);

      return updatedData;
    });
  }, []);

  const deleteFromCart = useCallback((id: string | number) => {
    setCart((prev) => {
      const updatedData = prev.filter((item) => item.id !== id);
      saveToLocalStorage("cart", updatedData);

      return updatedData;
    });
  }, []);

  /* ------------------------------
      WISHLIST FUNCTIONS
  ------------------------------ */

  const addToWishlist = useCallback((item: TProduct) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === item.id);
      if (exists) return prev;

      const updated = [...prev, item];
      saveToLocalStorage("wishlist", updated);
      return updated;
    });
  }, []);

  const deleteFromWishlist = useCallback((id: string | number) => {
    setWishlist((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      saveToLocalStorage("wishlist", updated);

      return updated;
    });
  }, []);

  const moveWishlistToCart = useCallback(
    (id: string | number) => {
      const item = wishlist.find((w) => w.id === id);

      if (item) {
        addToCart(item);
        deleteFromWishlist(id);
      }
    },
    [wishlist, addToCart, deleteFromWishlist]
  );

  return (
    <CartWishlistContext.Provider
      value={{
        cart,
        wishlist,

        addToCart,
        updateCartQuantity,
        decreaseCartQuantity,
        deleteFromCart,

        addToWishlist,
        deleteFromWishlist,
        moveWishlistToCart,
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
}
