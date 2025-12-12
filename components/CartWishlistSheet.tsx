"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useEffect, useState } from "react";
import { useCartWishlist } from "@/hooks/useCartWishlist";
import CartTab from "./CartTab";
import WishlistTab from "./WishlistTab";

interface ICartWishlistProps {
  isOpen: boolean;
  onOpenChange?: (value: boolean) => void;
  tabValue?: "cart" | "wishlist";
}

const CartWishlistSheet = ({
  isOpen,
  onOpenChange,
  tabValue = "cart",
}: ICartWishlistProps) => {
  const [selectedTab, setSelectedTab] = useState<"cart" | "wishlist">(tabValue);

  useEffect(() => {
    setSelectedTab(tabValue);
  }, [tabValue]);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        className="text-primary-foreground bg-primary w-full md:min-w-[450px] px-5 pt-10"
        side="right"
      >
        <Tabs value={selectedTab} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="cart" onClick={() => setSelectedTab("cart")}>
              Cart
            </TabsTrigger>
            <TabsTrigger
              value="wishlist"
              onClick={() => setSelectedTab("wishlist")}
            >
              Wishlist
            </TabsTrigger>
          </TabsList>
          <TabsContent value="cart">
            <CartTab />
          </TabsContent>
          <TabsContent value="wishlist">
            <WishlistTab />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default CartWishlistSheet;
