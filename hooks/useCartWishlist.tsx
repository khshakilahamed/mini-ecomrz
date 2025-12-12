"use client";

import { CartWishlistContext } from "@/Providers/CartWishlistProvider";
import { useContext } from "react";

export function useCartWishlist() {
  const context = useContext(CartWishlistContext);
  if (!context)
    throw new Error("useCart must be used inside a CartWishlistProvider");
  return context;
}
