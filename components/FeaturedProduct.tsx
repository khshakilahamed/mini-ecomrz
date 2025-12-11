"use client";

import { useEffect, useState } from "react";
import { products } from "@/constants/product";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import ProductFilter from "./ProductFilter";
import ProductCard from "./ProductCard";

const FeaturedProduct = () => {
  const [filterValue, setFilterValue] = useState("");
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const [cart, setCart] = useState<string[]>([]);

  const handleAddToCart = (productId: string) => {
    setCart([...cart, productId]);
    // Here you would typically trigger a toast notification
    console.log(`Product ${productId} added to cart`);
  };

  /* const onSelect = () => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }; */

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    // Call on initial load
    onSelect();

    // Register callback for carousel events
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const handlePrevClick = () => {
    api?.scrollPrev();
  };

  const handleNextClick = () => {
    api?.scrollNext();
  };

  return (
    <div>
      <div className="container-1200 py-16 sm:py-20 border-b">
        <h2 className="text-3xl lg:text-[34px] text-center sm:text-start text-white font-bold uppercase italic">
          Featured Products
        </h2>

        <div className="pt-16 sm:pt-10"></div>
        <Carousel
          opts={{
            align: "start",
          }}
          setApi={setApi}
          className="w-full relative"
        >
          <ProductFilter
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            onPrev={handlePrevClick}
            onNext={handleNextClick}
            canPrev={canScrollPrev}
            canNext={canScrollNext}
            className="mb-10"
          />

          <CarouselContent>
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="xs:basis-1/2 md:basis-1/3 lg:basis-1/4 bg-transparent"
              >
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product.id)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default FeaturedProduct;
