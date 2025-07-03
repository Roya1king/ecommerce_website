import ProductCard from '@/components/home/ProductCard'
import { productSearch } from '@/lib/api'
import { Product } from '@/lib/type'
import React from 'react'

const SearchPage = async ({searchParams}:{searchParams:Promise<{query:string | null |undefined}>}) => {
  const {query} = await searchParams
  const searchResults= query ?await productSearch(query) : []
  console.log("Search Results:", searchResults)
  return (
    <div className='main-max-width mx-auto padding-x py-9'>
      <div className='flex flex-centre flex-wrap justify-center my-9 gap-4'>
        {searchResults.length > 0 ?
          searchResults.map((product:Product) => <ProductCard key={product.id} prod={product}/>) :
          <p className='text-center text-gray-500'>No products found</p>
        }
      </div>

    </div>
  )
}

export default SearchPage

