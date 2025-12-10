import Banner from "@/components/Banner";
import CarDiagnostic from "@/components/CarDiagnostic";
import FeaturedProduct from "@/components/FeaturedProduct";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ContactHeader from "@/components/ui/ContactHeader";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <>
      {/* <Header/> */}
      <ContactHeader/>
      <div className="sticky top-0 z-50 shadow-md">
        <Navbar/>
      </div>
      <Banner/>
      <CarDiagnostic/>
      <WhyChooseUs/>
      <FeaturedProduct/>
      <Footer/>
    </>
  );
}
