import React from 'react'
import Image from 'next/image'
import { BASE_URL } from '@/lib/api'
import { OrderItemType, WishlistType } from '@/lib/type'

const MiniProductCard = ({item}:{item:OrderItemType | WishlistType}) => {

  return (
        <div className="w-[220px] rounded-lg shadow-md bg-white flex flex-col items-center gap-3 px-4 py-5 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
    <div className="w-[160px] h-[160px] rounded-md overflow-hidden">
      <Image
        src={BASE_URL + item.product.image}
        className="object-cover w-full h-full"
        width={160}
        height={160}
        alt="thumbnail"
      />
    </div>
  
    {/* Product Name */}
    <p className="text-center text-base font-medium text-gray-800">{item.product.name}</p>
  
    {/* Product Price */}
    <p className="text-[16px] text-center font-bold text-black">${item.product.price}</p>
  

  </div>
  )
}

export default MiniProductCard