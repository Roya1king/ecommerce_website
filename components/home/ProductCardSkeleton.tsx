import React from 'react'

const ProductCardSkeleton = () => {
  return (
    <div className="w-[260px] h-[360px] rounded-lg shadow-md bg-white flex flex-col items-center gap-3 px-4 py-5 animate-pulse">
      
      {/* Image skeleton */}
      <div className="w-[200px] h-[200px] rounded-md bg-gray-200" />

      {/* Name skeleton */}
      <div className="w-3/4 h-4 bg-gray-200 rounded" />

      {/* Price skeleton */}
      <div className="w-1/4 h-4 bg-gray-200 rounded" />
    </div>
  )
}

export default ProductCardSkeleton

//59:20
