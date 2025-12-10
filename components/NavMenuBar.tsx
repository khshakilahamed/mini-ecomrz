"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { navMenuItems } from "@/constants/nav-menu-items";
import { IoChevronDownOutline } from "react-icons/io5";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const NavMenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNestedItem, setIsOpenNestedItem] = useState<number | string>(0);

  const onHandleNestedItem = (id: string | number = 0) => {
    setIsOpenNestedItem((prev) => (prev === id ? 0 : id));
  };

  return (
    <div className="">
      <Menubar className="bg-transparent border-0 max-w-[1200px] px-4 xl:px-0 mx-auto text-primary-foreground hidden md:flex items-center justify-evenly py-3">
        {navMenuItems?.map((menu) => (
          <MenubarMenu key={menu?.id}>
            <MenubarTrigger className="space-x-1">
              {menu?.label}{" "}
              {menu?.subMenus?.length > 0 && <IoChevronDownOutline />}
            </MenubarTrigger>

            {menu?.subMenus?.length > 0 && (
              <MenubarContent>
                {menu.subMenus.map((subMenu) => (
                  <MenubarItem key={subMenu.id}>{subMenu.label}</MenubarItem>
                ))}
              </MenubarContent>
            )}
          </MenubarMenu>
        ))}
      </Menubar>

      <div className="flex md:hidden flex-col text-primary-foreground">
        {navMenuItems?.map((item) => {
          if (!item?.subMenus?.length) {
            return (
              <Link
                href={`${item?.href}`}
                key={item?.id}
                className={`inline-block py-1 px-3 hover:bg-primary/30 rounded-md cursor-pointer`}
                onClick={() => setIsOpen(false)}
              >
                {item?.label}
              </Link>
            );
          } else {
            return (
              <div key={item?.id} className="group">
                <p
                  className="flex items-center gap-1 py-1 px-3 rounded-md cursor-pointer"
                  onClick={() => onHandleNestedItem(item?.id)}
                >
                  {item?.label}
                  <IoIosArrowDown
                    className={`transition-transform duration-300 ${
                      isOpenNestedItem === item?.id ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </p>
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpenNestedItem === item?.id
                      ? "max-h-[1000px] opacity-100"
                      : "h-0 opacity-0"
                  }`}
                >
                  {item?.subMenus?.map((subItem) => (
                    <p key={subItem?.id} className="ml-3 border-l">
                      <Link
                        href={`${subItem?.href ? subItem?.href : "/"}`}
                        className={`pl-5 flex items-center gap-2 py-1 px-3 hover:bg-primary/30 rounded-md cursor-pointer`}
                        onClick={() => setIsOpen(false)}
                      >
                        {subItem?.label}
                      </Link>
                    </p>
                  ))}
                </div>
              </div>
            );
          }
        })}
        {/* <Link href={"/contact-us"}>
          <Button>Contact Us</Button>
        </Link> */}
      </div>
    </div>
  );
};

export default NavMenuBar;
