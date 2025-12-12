"use client";

import { TCartItem, TCartWishlistContext, TProduct } from "@/types";
import {
  createContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

export const CartWishlistContext = createContext<TCartWishlistContext | null>(null);

export function CartWishlistProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<TCartItem[]>([]);
  const [wishlist, setWishlist] = useState<TProduct[]>([]);

  /* ------------------------------
      Load From LocalStorage
  ------------------------------ */
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedWishlist = localStorage.getItem("wishlist");

    if (storedCart) setCart(JSON.parse(storedCart));
    if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
  }, []);

  /* ------------------------------
      Save To LocalStorage
  ------------------------------ */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  /* ------------------------------
      CART FUNCTIONS
  ------------------------------ */

  const addToCart = useCallback((item: TProduct) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);

      if (exists) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const updateCartQuantity = useCallback(
    (id: string | number, quantity: number) => {
      setCart((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(quantity, 1) }
            : item
        )
      );
    },
    []
  );

  const decreaseCartQuantity = useCallback((id: string | number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const deleteFromCart = useCallback((id: string | number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  /* ------------------------------
      WISHLIST FUNCTIONS
  ------------------------------ */

  const addToWishlist = useCallback((item: TProduct) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === item.id);
      if (exists) return prev;
      return [...prev, item];
    });
  }, []);

  const deleteFromWishlist = useCallback((id: string | number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
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