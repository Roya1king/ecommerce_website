import React from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "@/lib/api";
import { Product } from "@/lib/type";

interface Props{
  title?:string,
  detailPage?:boolean,
  similar_products?:Product[],
}

const ProductSection = async({title, similar_products, detailPage}:Props) => {

  const products=detailPage ? similar_products : await getProducts();

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