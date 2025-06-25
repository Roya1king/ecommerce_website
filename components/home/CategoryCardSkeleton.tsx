import React from 'react'

const CategoryCardSkeleton = () => {
  return (
    <div className='w-[220px] h-[220px] bg-white rounded-2xl shadow-md flex flex-col items-center justify-center p-4'>
        <div className='w-16 h-16 bg-gray-300 rounded-full '></div>
        <div className='w-24 h-4 mt-3 bg-gray-300 rounded-md'></div>

    </div>
  )
}

export default CategoryCardSkeleton