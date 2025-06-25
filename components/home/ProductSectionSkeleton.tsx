import React from 'react'
import ProductCardSkeleton from './ProductCardSkeleton'

const ProductSectionSkeleton = () => {
  return (
    <section className="main-max-width padding-x mx-auto my-16">
      <h2 className="my-9 text-center text-xl font-bold text-gray-800">
        Loading Products...
      </h2>

      <div className="flex-center flex-wrap gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </section>
  )
}

export default ProductSectionSkeleton
