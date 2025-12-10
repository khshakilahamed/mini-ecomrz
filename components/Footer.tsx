import Image from "next/image";
import Logo from "./../assets/your-logo.png";
import { FaXTwitter, FaFacebookF, FaInstagram } from "react-icons/fa6";
import { RiYoutubeLine } from "react-icons/ri";
import { companyMenu, services } from "@/constants/footer";
import Link from "next/link";
import VisaCard from "./../assets/visa.png";
import MasterCard from "./../assets/master-card.png";
import Paypal from "./../assets/paypal.png";
import AmericanEx from "./../assets/american-exp.png";
import VisaCard2 from "./../assets/visa-2.png";

const Footer = () => {
  return (
    <div className="footer-bg bg-linear-to-b from-secondary/0 to-secondary">
      <div className="bg-secondary/70 text-primary-foreground">
        <div className="container-1200 py-16">
          {/*  */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-16">
            {/* Logo */}
            <div className="space-y-3">
              <Image src={Logo} alt="company logo" width={250} height={70} />
              <p>
                When you need the best auto parts for your ride, turn to
                Autovio. Limited time offer for only new customer also get free
                shipping on orders.
              </p>
              <div className="flex items-center space-x-3 xs:space-x-5 text-secondary-foreground ">
                <FaXTwitter className="text-2xl" />
                <FaFacebookF className="text-2xl" />
                <FaInstagram className="text-2xl" />
                <RiYoutubeLine className="text-3xl" />
              </div>
            </div>
            {/* Company menu */}
            <div>
              <h2 className="text-xl font-bold uppercase text-white">
                Our Company
              </h2>
              <div className="flex flex-col mt-5 space-y-3">
                {companyMenu?.map((menu) => (
                  <Link id={menu?.id} href={menu?.href ?? "#"}>
                    {menu?.label}
                  </Link>
                ))}
              </div>
            </div>
            {/* Services */}
            <div>
              <h2 className="text-xl font-bold uppercase text-white">
                Our Services
              </h2>
              <div className="flex flex-col mt-5 space-y-3">
                {services?.map((menu) => (
                  <Link id={menu?.id} href={menu?.href ?? "#"}>
                    {menu?.label}
                  </Link>
                ))}
              </div>
            </div>
            {/* Contact */}
            <div>
              <h2 className="text-xl font-bold uppercase text-white">
                Contact Us
              </h2>
              <div className="flex flex-col mt-5 space-y-3">
                <p>
                  <span className="text-destructive">Address : </span>126 Horton
                  Grange Road, Bradford, West Yorkshire, BD7 2DW
                </p>
                <p>
                  <span className="text-destructive">Phone : </span>
                  <a href="tel:+18636166">+186.36.166</a>
                </p>
                <p>
                  <span className="text-destructive">Fax : </span>123456
                </p>
                <p>
                  <span className="text-destructive">Fax : </span>
                  <a href="mailto:contact@abc.co.uk">contact@abc.co.uk</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr className="" />
        <div className="container-1200 py-8 flex flex-col-reverse sm:flex-row justify-center sm:justify-between items-center gap-5">
            <p>Copyright © {new Date().getFullYear()} <span className="text-destructive">abc</span> - All Rights Reserved.</p>
            <div className="flex flex-wrap justify-center gap-3">
                  <Image src={VisaCard} alt="visa" width={42} height={25}/>
                  <Image src={MasterCard} alt="MasterCard" width={42} height={25}/>
                  <Image src={Paypal} alt="Paypal" width={42} height={25}/>
                  <Image src={AmericanEx} alt="AmericanEx" width={42} height={25}/>
                  <Image src={VisaCard2} alt="VisaCard2" width={42} height={25}/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
