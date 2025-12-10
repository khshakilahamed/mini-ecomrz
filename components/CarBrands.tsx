"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { carBrands } from "@/constants/car-brands";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const CarBrands = () => {
  return (
    <div className="container-1200 my-16">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {carBrands?.map((brand) => (
            <CarouselItem key={brand?.id} className="basis-1/3 xs:basis-1/4 sm:basis-1/5 md:basis-1/6 lg:basis-1/7">
              <Image
                src={brand?.image}
                width={70}
                height={70}
                alt={brand?.title}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CarBrands;
