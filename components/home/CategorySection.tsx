import React from 'react'
import CategoryCard from './CategoryCard'
const CategorySection = () => {
  return (
    <section className='main-max-width padding-x mx-auto'>
        <h2 className="my-9 text-center text-xl font-bold text-gray-800 ">
            Browse By Category
        </h2>

        <div className=' flex flex-wrap gap-8 justify-center'>
            <CategoryCard/>
            <CategoryCard/>
            <CategoryCard/>
            <CategoryCard/>
            <CategoryCard/>
            <CategoryCard/>
        </div>
    </section>
  )
}

export default CategorySection