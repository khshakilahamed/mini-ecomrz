import { whyChooseUs } from "@/constants/why-choose.us";
import Image from "next/image";

const WhyChooseUs = () => {
  return (
    <div>
      <div className="container-1200 py-16 sm:py-20 border-b">
        <h2 className="text-3xl lg:text-4xl text-center sm:text-start text-white font-bold uppercase italic">
          Why Choose Us?
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 pt-16 sm:pt-20">
          {whyChooseUs?.map((item, index) => (
            <div key={item?.id}>
              {/* title */}
              <div className="flex gap-10 sm:gap-5 lg:gap-10">
                <div className="h-12 w-14 flex justify-center">
                  <Image
                    src={item?.image}
                    alt={item?.title}
                    className="w-full h-full object-fill"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-white text-2xl lg:text-3xl font-semibold">
                    {item?.title}
                  </h3>
                </div>
              </div>
              {/* description */}
              <div className="flex gap-10 sm:gap-5 lg:gap-10 mt-5">
                <div className="w-14">
                  <p className="text-[56px] font-bold text-center text-stroke">{index + 1}</p>
                </div>
                <div className="flex-1">
                  <p className="text-primary-foreground text-sm">{item?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
