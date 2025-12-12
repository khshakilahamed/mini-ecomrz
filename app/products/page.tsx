"use client";

import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/skeleton/ProductCardSkeleton";
import { products } from "@/constants/product";
import { TProduct } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Products = () => {
  const [productData, setProductData] = useState<TProduct[]>([]);
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  console.log("search: ", search);

  useEffect(() => {
    setProductData(products as TProduct[]);
  }, []);

  useEffect(() => {
    const searchedData = products.filter((product: TProduct) => {
      const title = product.title.toLowerCase();
      const description = (product.description || "").toLowerCase();
      const term = search.toLowerCase();

      return title.includes(term) || description.includes(term);
    });

    setProductData(searchedData);
  }, [search, products]);

  return (
    <div className="container-1200 grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-10">
      {productData.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
