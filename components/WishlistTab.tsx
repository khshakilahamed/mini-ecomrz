"use client";

import { useCartWishlist } from "@/hooks/useCartWishlist";

const WishlistTab = () => {
  const { wishlist } = useCartWishlist();

  console.log("wishlist: ", wishlist);

  return <div>Wishlist</div>;
};

export default WishlistTab;
