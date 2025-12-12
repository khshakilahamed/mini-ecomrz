"use client";

import { contactMenu } from "@/constants/contact-header";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaXTwitter, FaFacebookF, FaInstagram } from "react-icons/fa6";
import { RiYoutubeLine } from "react-icons/ri";
import { IoMailOpen } from "react-icons/io5";

const ContactHeader = () => {
  const pathname = usePathname();

  return (
    <div className="bg-secondary border border-b">
      <div className="max-w-[1200px] px-4 xl:px-0 mx-auto py-4 flex flex-wrap justify-between items-center">
        <div className="hidden sm:flex text-primary-foreground text-sm text-wrap">
          {contactMenu?.map((item, index) => (
            <span key={item.id}>
              <Link
                href="/"
                className={`${
                  pathname === item?.href ? "text-destructive" : ""
                }`}
              >
                {item.label}
              </Link>
              {index < contactMenu.length - 1 && (
                <span className="px-3">|</span>
              )}
            </span>
          ))}
        </div>
        <div className="text-secondary-foreground flex flex-wrap items-center justify-between sm:justify-start space-x-5 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <IoMailOpen />
            <a href="mailto:contact@abc.om" className="text-primary-foreground">
              contact@abc.com
            </a>
          </div>
          <span className="hidden sm:flex">|</span>
          <div className="flex items-center space-x-3 xs:space-x-5 text-secondary-foreground ">
            <FaXTwitter />
            <FaFacebookF />
            <FaInstagram />
            <RiYoutubeLine className="text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactHeader;
