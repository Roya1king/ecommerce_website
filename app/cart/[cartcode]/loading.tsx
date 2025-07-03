import React from 'react'

const loading = () => {
  return (
    <div className="main-max-width padding-x mx-auto py-9">
      <h1 className="font-semibold text-2xl text-gray-800 mb-6">Cart</h1>

      <div className="flex flex-wrap gap-6 lg:gap-8 justify-between w-full animate-pulse">
        {/* Loading Cart Items Skeleton */}
        <div className="w-[600px] max-lg:w-full border border-gray-200 shadow-sm rounded-lg bg-white overflow-hidden flex-1">
          <div className="max-h-[400px] overflow-y-auto px-6 py-4 space-y-6">
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="flex items-center justify-between gap-6 py-4 w-full flex-wrap">
                <div className="w-[70px] h-[70px] bg-gray-200 rounded-lg" />
                <div className="flex-1 min-w-[120px]">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                </div>
                <div className="w-[120px] h-[40px] bg-gray-200 rounded-md" />
                <div className="w-[80px] h-6 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Loading Summary Skeleton */}
        <div className="w-[400px] max-lg:w-full border border-gray-200 rounded-lg shadow-md bg-white px-8 py-6 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
          <hr className="my-4 border-gray-300" />
          <div className="h-5 bg-gray-200 rounded w-1/2" />
          <div className="h-10 bg-gray-300 rounded w-full mt-6" />
        </div>
      </div>
    </div>
  )
}

export default loading