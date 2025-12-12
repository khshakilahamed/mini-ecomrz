import Banner from "@/components/Banner";
import CarBrands from "@/components/CarBrands";
import CarDiagnostic from "@/components/CarDiagnostic";
import CustomerReview from "@/components/CustomerReview";
import FeaturedProduct from "@/components/FeaturedProduct";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ContactHeader from "@/components/ui/ContactHeader";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <>
      {/* <Header/> */}
      
      <Banner/>
      <CarDiagnostic/>
      <WhyChooseUs/>
      <FeaturedProduct/>
      <CustomerReview/>
      <p className="w-full h-0.5 sm:h-1.5 bg-[#1A1F28]"></p>
      <CarBrands/>
      <p className="sm:hidden w-full h-1 bg-[#1A1F28]"></p>
    </>
  );
}
