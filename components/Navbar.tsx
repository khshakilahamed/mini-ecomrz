"use client";

import { Input } from "./ui/input";
import CellPhone from "./../assets/cell-phone.png";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa6";
import { IoMdLogIn } from "react-icons/io";
import { GrCart } from "react-icons/gr";
import logo from "./../assets/your-logo.png";
import { Label } from "./ui/label";
import { BiSearch } from "react-icons/bi";
import NavMenuBar from "./NavMenuBar";
import NavMenusSmallScreen from "./NavMenusSmallScreen";
import CartWishlistSheet from "./CartWishlistSheet";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tabValue, setTabValue] = useState<"cart" | "wishlist">("cart");

  console.log("navbar: ", tabValue);

  return (
    <>
      <div className="bg-secondary">
        <div className="max-w-[1200px] px-4 xl:px-0 mx-auto text-secondary-foreground flex items-center justify-between space-x-10 py-3 sm:py-5">
          {/* LEFT: Logo + Search */}
          <div className="flex items-center xs:space-x-10 flex-1">
            <div className="flex items-center space-x-1.5">
              <span className="lg:hidden">
                <NavMenusSmallScreen />
              </span>
              <Image
                src={logo}
                alt="company-logo"
                width={210}
                height={59}
                className="w-[165px] md:w-[180px] lg:w-[210px] h-[46px] md:h-[50px] lg:h-[59px]"
              />
            </div>
            <div className="hidden sm:flex flex-1 relative">
              <Label
                htmlFor="searchBar"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl"
              >
                <BiSearch />
              </Label>

              <Input
                id="searchBar"
                type="search"
                className="border-2 py-5 pr-10"
              />
            </div>
          </div>

          {/* RIGHT: Icons + Phone (Phone hidden on small screens) */}
          <div className="flex items-center gap-20">
            {/* Phone section – hidden on mobile */}
            <div className="hidden lg:flex items-center gap-3 order-2 lg:order-1">
              <Image src={CellPhone} alt="cell-icon" />
              <div className="flex flex-col space-y-1">
                <small>Call us free</small>
                <a href="tel:+18636166" className="text-primary-foreground">
                  +1 86.36.166
                </a>
              </div>
            </div>

            {/* Icons section */}
            <div className="flex items-center gap-2 xs:gap-5 order-1 lg:order-2">
              <button className="hidden md:flex items-center gap-2 text-primary-foreground">
                <IoMdLogIn /> Account
              </button>
              <BiSearch className="flex sm:hidden text-[20px] sm:text-[26px] text-primary-foreground" />
              <FaRegHeart
                onClick={() => {
                  setIsOpen(true);
                  setTabValue("wishlist");
                }}
                className="flex text-[20px] sm:text-[26px] text-primary-foreground"
              />
              <GrCart
                onClick={() => {
                  setIsOpen(true);
                  setTabValue("cart");
                }}
                className="flex text-[20px] sm:text-[26px] text-primary-foreground"
              />
              <IoMdLogIn className="flex md:hidden text-[20px] sm:text-[26px] text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>
      {/* Navbar Menus */}
      <div className="hidden lg:block">
        <NavMenuBar />
      </div>

      <CartWishlistSheet
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        tabValue={tabValue}
      />
    </>
  );
};

export default Navbar;
