import CustomerReviewCarousel from "./CustomerReviewCarousel";

const CustomerReview = () => {
  return (
    <div className="bg-[#1D232D]">
      <div className="container-1200 py-16 sm:py-20">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl lg:text-[34px] text-start text-white font-bold uppercase italic">
            the love from our <br /> customers
          </h2>
          <p className="text-secondary-foreground">See All Reviews {">"}</p>
        </div>
        <CustomerReviewCarousel/>
      </div>
    </div>
  );
};

export default CustomerReview;
