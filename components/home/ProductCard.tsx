import React from 'react'
import Image from "next/image"
import { Product } from '@/lib/type'
import { BASE_URL } from '@/lib/api'

const ProductCard = ({ prod }: { prod: Product }) => {
  return (
    <div className="w-[260px] h-[360px] rounded-lg shadow-md bg-white flex flex-col items-center gap-3 px-4 py-5 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
      
      {/* Product Image */}
      <div className="w-[200px] h-[200px] rounded-md overflow-hidden flex items-center justify-center bg-gray-100">
        <Image
          src={BASE_URL + prod.image}
          width={200}
          height={200}
          alt="thumbnail"
          className="object-contain w-full h-full"
        />
      </div>

      {/* Product Name */}
      <p className="text-center text-base font-semibold text-gray-800 line-clamp-2">
        {prod.name}
      </p>

      {/* Product Price */}
      <p className="text-[16px] text-center font-bold text-black">
        ${prod.price}
      </p>
    </div>
  )
}

export default ProductCard
