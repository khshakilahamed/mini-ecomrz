import Products from "@/components/Products";
import ProductCardSkeleton from "@/components/skeleton/ProductCardSkeleton";
import { Suspense } from "react";

const ProductPage = () => {
  return (
    <Suspense
      fallback={
        <div className="container-1200 grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-10">
          {[...Array(8)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      }
    >
      <Products />
    </Suspense>
  );
};

export default ProductPage;
