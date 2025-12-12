"use client"

import Image from "next/image"
import { Heart, ShoppingCart, X } from "lucide-react"
import { useCartWishlist } from "@/hooks/useCartWishlist"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

export default function WishlistTab() {
  const { wishlist, deleteFromWishlist,  moveWishlistToCart } = useCartWishlist()

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-center px-4">
        <div className="w-20 h-20 mb-4 rounded-full bg-primary-foreground/10 flex items-center justify-center">
          <Heart className="w-10 h-10 text-primary-foreground/40" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
        <p className="text-sm text-primary-foreground/70">Save your favorite items here</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] pt-5">
      <ScrollArea className="flex-1 min-h-0">
        <div className="space-y-4 pr-4">
          {wishlist.map((item) => (
            <div key={item.id} className="flex gap-4 border-b pb-4 last:border-b-0">
              {/* Product Image */}
              <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-muted">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                {item.isNew && (
                  <Badge className="absolute top-2 left-2 text-xs px-2 py-0.5" variant="default">
                    NEW
                  </Badge>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-medium text-sm leading-tight line-clamp-2">{item.title}</h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 flex-shrink-0 -mt-1"
                    onClick={() => deleteFromWishlist(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground mb-2">{item.category}</p>

                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-base">${item.newPrice.toFixed(2)}</span>
                  {item.oldPrice > item.newPrice && (
                    <span className="text-xs text-muted-foreground line-through">${item.oldPrice.toFixed(2)}</span>
                  )}
                </div>

                {/* Move to Cart Button */}
                <Button size="sm" className="w-full h-9" onClick={() => moveWishlistToCart(item.id)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Move to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
