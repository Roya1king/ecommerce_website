import React from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "@/lib/api";
import { Product } from "@/lib/type";

interface Props{
  title?:string
}

const ProductSection = async({title}:Props) => {
  const products=await getProducts();
  console.log(products);
  return (
    <section className="main-max-width padding-x mx-auto my-16">
      <h2 className="my-9 text-center text-xl font-bold text-gray-800">
        {title || "Featured Products"}
      </h2>

      {/* Content */}
      <div className="flex-center flex-wrap gap-4">
        {products.map((prod:Product) => (
          <ProductCard key={prod.id} prod={prod} />))}
      </div>
    </section>
  );
};

export default ProductSection;