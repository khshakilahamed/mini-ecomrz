import ProductCard from "@/components/ProductCard";
import { products } from "@/constants/product";

const Products = () => {
  return (
    <div className="container-1200 grid xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 py-10">
      {products.map((product) => (
        <ProductCard
            key={product.id}
            product={product}
            // onAddToCart={() => handleAddToCart(product.id)}
          />
      ))}
    </div>
  );
};

export default Products;
