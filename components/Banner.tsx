"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import BannerHeadline from "./BannerHeadline";
import TopDonPhoenix from "./../assets/topdon-phoenix.png";
import Image from "next/image";
import { Button } from "./ui/button";

const Banner = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="bg-secondary text-primary-foreground banner-bg">
      <Carousel
        setApi={setApi}
        className="max-w-[1200px] px-2 xl:px-10 mx-auto relative min-h-[30vh]  md:min-h-[60vh]"
      >
        <div className="hidden lg:block">
          <BannerHeadline />
        </div>
        <CarouselContent className="min-h-[30vh] md:min-h-[60vh]  flex">
          {Array.from({ length: 4 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="min-h-[30vh] md:min-h-[60vh]  flex items-center justify-between px-6"
            >
              <div className=" w-2/3 sm:w-3/5 md:w-1/2 space-y-2 sm:space-y-4 lg:space-y-5">
                <h2 className="uppercase text-sm sm:text-lg md:text-2xl lg:text-[32px] font-semibold text-white">
                  topdon phoenix elite
                </h2>
                <p className="text-[10px] sm:text-[12px] md:text-sm lg:text-base">
                  TOPDON Phoenix Elite, dealer-level diagnostics at a fraction
                  of the cost. If you don’t need the online programming
                  capabilities, you may want to consider the PHOENIX LITE
                  2 which offers excellent value for money.
                </p>

                <Button className="bg-destructive uppercase px-4 sm:px-6 lg:px-8 py-3 sm:py-5 lg:py-6 lg:mt-5 text-white">learn more</Button>
              </div>
              <div className=" w-1/3 sm:w-2/5 md:w-1/2">
                <Image src={TopDonPhoenix} alt="product" className="w-full h-full" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex justify-center gap-3 pb-4 sm:pb-8">
          {Array(count)
            .fill(0)
            .map((_, index) => (
              <p
                key={index}
                className={`h-2 sm:h-3 w-2 sm:w-3 rounded-full ${
                  current === index + 1 ? "bg-destructive" : "bg-[#253146]"
                }`}
              ></p>
            ))}
        </div>

        {/* buttons */}
        <CarouselPrevious className="absolute left-2 xl:left-0 bg-transparent text-white border-white cursor-pointer size-6 md:size-8">
          <FaAngleLeft className="text-white text-[10px] md:text-3xl" />
        </CarouselPrevious>
        <CarouselNext className="absolute right-2 xl:right-0  bg-transparent text-white border-white cursor-pointer size-6 md:size-8">
          <FaAngleRight className="text-white text-[10px] md:text-3xl" />
        </CarouselNext>
      </Carousel>
    </div>
  );
};

export default Banner;
