import React from 'react'
// import ProductCard from '@/components/home/ProductCard'
import CategoryBtn from '@/components/category/CategoryBtn'
import { getCategories, getCategory } from '@/lib/api'
import { category, Product } from '@/lib/type';
import ProductCard from '@/components/home/ProductCard';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const category : category= await getCategory(slug);
  return {
    title: `${category.name} - Shoppit`,
    description: `Explore products in the ${category.name} category.`
  }
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat: category) => ({ slug: cat.slug }));
}

const CategoryPage = async ({ params }: { params: { slug: string } }) => {

  const { slug } = params;

  const [categories, category] = await Promise.all([
    getCategories(),
    getCategory(slug)
  ]);

  // console.log(category);

  const products = category.products;

  return (
    <div className="main-max-width mx-auto padding-x py-9">
        <p className="font-semibold text-center"> {category.name} </p>

        <div className="flex-center flex-wrap my-6 gap-4">
          {categories.map((cat: category) => (
            <CategoryBtn key={cat.id} cat={cat} />
          ))}

        </div>


        <div className='flex-center flex-wrap my-6 gap-4'>
          {products.map((prod: Product) => <ProductCard key={prod.id} prod={prod} />)}
        </div>

    </div>
  )
}

export default CategoryPage