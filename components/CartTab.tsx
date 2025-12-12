"use client";

import { useCartWishlist } from "@/hooks/useCartWishlist";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TCartItem } from "@/types";

const CartTab = () => {
  const { cart, decreaseCartQuantity, addToCart, deleteFromCart } =
    useCartWishlist();

  // Calculate totals
  const subtotal = cart.reduce(
    (sum: number, item: TCartItem) => sum + item.newPrice * item.quantity,
    0
  );
  const shipping = cart.length > 0 ? 15.0 : 0;
  const total = subtotal + shipping;

  if (!cart || cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-center px-4">
        <div className="w-20 h-20 mb-4 rounded-full bg-primary-foreground/10 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-primary-foreground/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
        <p className="text-sm text-primary-foreground/70">
          Add items to get started
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <ScrollArea className="flex-1 min-h-0 pr-4">
        <div className="space-y-4 py-4">
          {cart.map((item: TCartItem) => (
            <div
              key={item.id}
              className="bg-primary-foreground/5 rounded-lg p-3 space-y-3"
            >
              <div className="flex gap-3">
                {/* Product Image */}
                <div className="relative w-20 h-20 rounded-md overflow-hidden bg-primary-foreground/10 shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  {item.isNew && (
                    <span className="absolute top-1 left-1 bg-green-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
                      NEW
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm leading-tight mb-1 line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-primary-foreground/60 mb-1">
                    {item.category}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">
                      ${item.newPrice.toFixed(2)}
                    </span>
                    {item.oldPrice > item.newPrice && (
                      <span className="text-xs text-primary-foreground/50 line-through">
                        ${item.oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Remove */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => decreaseCartQuantity(item?.id)}
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-primary-foreground/10 border-primary-foreground/20"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="font-semibold w-8 text-center">
                    {item.quantity}
                  </span>
                  <Button
                    onClick={() => addToCart(item)}
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-primary-foreground/10 border-primary-foreground/20"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                <Button
                  onClick={() => deleteFromCart(item?.id)}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Item Total */}
              <div className="flex justify-between items-center pt-2 border-t border-primary-foreground/10">
                <span className="text-xs text-primary-foreground/70">
                  Item Total:
                </span>
                <span className="font-bold">
                  ${(item.newPrice * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Cart Summary */}
      <div className="mt-auto pt-4 border-t border-primary-foreground/20">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-primary-foreground/70">Subtotal:</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-primary-foreground/70">Shipping:</span>
            <span className="font-semibold">${shipping.toFixed(2)}</span>
          </div>
          <Separator className="bg-primary-foreground/20" />
          <div className="flex justify-between text-base">
            <span className="font-bold">Total:</span>
            <span className="font-bold text-lg">${total.toFixed(2)}</span>
          </div>
        </div>

        <Button className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartTab;
