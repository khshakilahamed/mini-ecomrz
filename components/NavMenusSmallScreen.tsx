"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavMenuBar from "./NavMenuBar";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { IoMenu, IoMenuSharp } from "react-icons/io5";

const NavMenusSmallScreen = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    // Close the Sheet on initial load if screen is less than lg
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="max-w-max md:hidden">
        <Button variant="ghost" className="bg-transparent px-2 w-6">
          <IoMenu className="text-white text-5xl" />
        </Button>
      </SheetTrigger>
      <SheetContent className="text-primary-foreground bg-primary" side="left">
        <SheetHeader>
          <SheetTitle className="text-white">Menu Items</SheetTitle>
        </SheetHeader>

        <NavMenuBar />
      </SheetContent>
    </Sheet>
  );
};

export default NavMenusSmallScreen;
