import React from 'react'
import ProductCard from '@/components/home/ProductCard'
import CategoryBtn from '@/components/category/CategoryBtn'
const CategoryPage = () => {
  return (
    <div className="main-max-width mx-auto padding-x py-9">
        <p className="font-semibold text-center"> Electronics </p>

        <div className="flex-center flex-wrap my-6 gap-4">
            <CategoryBtn />
            <CategoryBtn />
            <CategoryBtn />
            <CategoryBtn />
            <CategoryBtn />
        </div>


        <div className='flex-center flex-wrap my-6 gap-4'>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>

    </div>
  )
}

export default CategoryPage