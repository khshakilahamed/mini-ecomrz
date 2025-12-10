import Banner from "@/components/Banner";
import CarDiagnostic from "@/components/CarDiagnostic";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import ContactHeader from "@/components/ui/ContactHeader";

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
      <Footer/>
    </>
  );
}
