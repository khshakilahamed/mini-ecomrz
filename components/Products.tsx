"use client";

import ProductCard from "@/components/ProductCard";
import { products } from "@/constants/product";
import { TProduct } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Products = () => {
  const [productData, setProductData] = useState<TProduct[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const term = searchParams.get("search") || "";

    const searchedData = products.filter((product: TProduct) => {
      const title = product.title.toLowerCase();
      const description = (product.description || "").toLowerCase();
      const lowerTerm = term.toLowerCase();
      return title.includes(lowerTerm) || description.includes(lowerTerm);
    });
    setProductData(searchedData);
  }, [searchParams]);

  return (
    <div className="container-1200 grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-10">
      {productData.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
