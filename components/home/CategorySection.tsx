import React from 'react'
import CategoryCard from './CategoryCard'
import { getCategories } from '@/lib/api'
import { category } from '@/lib/type';
const CategorySection = async() => {
  const categories = await getCategories();
  console.log(categories);
  return (
    <section className='main-max-width padding-x mx-auto'>
        <h2 className="my-9 text-center text-xl font-bold text-gray-800 ">
            Browse By Category
        </h2>

        <div className=' flex flex-wrap gap-8 justify-center'>
            {categories.map((cat:category) => <CategoryCard key={cat.id} cat={cat}/>)}
        </div>
    </section>
  )
}

export default CategorySection