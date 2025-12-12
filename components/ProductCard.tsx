"use client";

import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import SoldOutBadge from "./../assets/sold-out.png";
import NewBadge from "./../assets/new.png";
import SaleBadge from "./../assets/sale.png";
import { Button } from "./ui/button";
import { TProduct } from "@/types";
import ProductBadge from "./ProductBadge";
import { useCartWishlist } from "@/hooks/useCartWishlist";
import { toast } from "sonner";

interface ProductCardProps {
  product: TProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartWishlist();

  const [isWishlisted, setIsWishlisted] = useState(false);
  const { id, title, rating, oldPrice, newPrice, isSold, image } =
    product || {};

  return (
    <div className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative bg-gray-800 aspect-square overflow-hidden group">
        <Image
          src={image}
          alt={title}
          width={300}
          height={300}
          className="object-cover group-hover:scale-105 transition-transform duration-300 w-full h-full"
        />

        {/* Badge */}
        <div className="absolute top-3 right-3">
          <ProductBadge product={product} />
        </div>

        {/* Wishlist Button */}
        <button
          className="absolute top-3 left-3 bg-[#253146] hover:bg-[#253146]/65 text-white rounded-md p-2 transition-all cursor-pointer"
          aria-label="Add to wishlist"
        >
          <Heart
            size={20}
            className={isWishlisted ? "fill-red-500 text-red-500" : ""}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 flex flex-col gap-3 py-3">
        {/* Rating */}
        <div className="flex items-center gap-1 my-3">
          <span className="text-xs text-muted-foreground ml-1">Rating:</span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-600"
                }
              />
            ))}
          </div>
        </div>

        <hr />

        {/* Title */}
        <h3 className="text-sm font-bold text-secondary-foreground line-clamp-2 my-2">
          {title}
        </h3>

        <hr />

        {/* Pricing */}
        <div className="flex items-center gap-2 ">
          <span className="text-lg font-semibold text-destructive">
            £{newPrice.toFixed(2)}
          </span>
          <span className="text-base text-muted-foreground line-through">
            £{oldPrice.toFixed(2)}
          </span>
          <span className="text-sm text-primary-foreground">Inc. VAT</span>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={() => {
            addToCart(product);
            toast.success("Successfully added.");
          }}
          disabled={isSold}
          className="mt-auto text-secondary-foreground bg-[#282E3A] hover:bg-[#282E3A]/65 rounded-full py-6"
        >
          <ShoppingCart size={16} />
          {isSold ? "Sold Out" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}
