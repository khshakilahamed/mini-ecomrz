"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn, getTimeAgo } from "@/lib/utils";
import { customerReviews } from "@/constants/customer-reviews";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { StarRating } from "./StarRating";
import TrustPilotLogo from "./../assets/trust-logo.png";
import Image from "next/image";

interface ICustomerReviewCarouselProps {
  className?: string;
}

const CustomerReviewCarousel = ({
  className,
}: ICustomerReviewCarouselProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(1); // 1-based index

  // Ref array for avatar items
  const itemRefs = React.useRef<Array<HTMLDivElement | null>>([]);

  // Update current index when main carousel changes
  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Handle avatar click
  const handleThumbClick = React.useCallback(
    (index: number) => {
      api?.scrollTo(index);
      setCurrent(index + 1);
    },
    [api]
  );

  // Calculate arrow horizontal position
  const getArrowLeft = () => {
    const el = itemRefs.current[current - 1];
    if (!el) return 0;
    return el.offsetLeft + el.offsetWidth / 2 - 64; // 64 = half of arrow width (w-32)
  };

  return (
    <div className={cn("mt-10 sm:mt-16 lg:mt-20", className)}>
      {/* Main Review Carousel */}
      <Carousel
        setApi={setApi}
        className="w-full bg-[#1F2632] p-6 sm:p-10 rounded"
      >
        <CarouselContent>
          {customerReviews?.map((review) => (
            <CarouselItem key={review.id}>
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex items-center gap-4 sm:gap-20">
                  <StarRating rating={review.rating} />
                  <Image
                    src={TrustPilotLogo}
                    alt="trust-pilot"
                    width={124}
                    height={14}
                    className="w-[82px] sm:w-[124px] h-[9px] sm:h-3.5"
                  />
                </div>
                <p className="text-secondary-foreground font-semibold text-[12px] sm:text-base">
                  {getTimeAgo(review.date)}
                </p>
              </div>
              <p className="italic text-[14px] sm:text-lg lg:text-[23px] text-white mt-5">
                {review.review}
              </p>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Avatar Carousel */}
      <div className="relative">
        <Carousel
          className="w-full"
        >
          <CarouselContent className="flex my-1 relative overflow-visible">
            {/* Moving Arrow */}
            <div
              className="conversion-arrow absolute -top-2 w-20 h-10 transition-all duration-300 z-50"
              style={{ left: getArrowLeft() }}
            />

            {customerReviews?.map((review, index) => {
              const names = review.name.split(" ");
              return (
                <CarouselItem
                  key={review.id}
                  ref={(el: HTMLDivElement | null) => {
                    // TypeScript-safe callback ref
                    itemRefs.current[index] = el ?? null;
                  }}
                  className={cn(
                    "md:basis-1/2 lg:basis-1/3 cursor-pointer flex items-center gap-4 pt-10",
                    current === index + 1 ? "opacity-100" : "opacity-50"
                  )}
                  onClick={() => handleThumbClick(index)}
                >
                  <Avatar className="w-[84px] h-[84px]">
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>
                      {names[0][0]}
                      {names[1][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{review.name}</h2>
                    <h4 className="text-secondary-foreground font-semibold">
                      <span className="capitalize">{review.designation}</span>{" "}
                      at
                    </h4>
                    <h3 className="text-accent font-semibold">
                      {review.companyName}
                    </h3>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default CustomerReviewCarousel;
