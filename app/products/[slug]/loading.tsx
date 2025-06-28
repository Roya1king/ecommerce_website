import React from 'react'

const loading = () => {
  return (
    <div className="bg-gray-50 padding-x py-10 flex items-start flex-wrap gap-12 main-max-width mx-auto animate-pulse">
      {/* Image Skeleton */}
      <div className="w-[350px] h-[400px] bg-gray-200 rounded-lg shadow-sm border border-gray-300" />

      {/* Info Skeleton */}
      <div className="flex flex-col flex-1 gap-4 max-w-[500px]">
        <div className="h-8 w-3/4 bg-gray-200 rounded-md" />
        <div className="h-6 w-1/4 bg-gray-200 rounded-md" />

        <div className="mt-6">
          <div className="h-5 w-1/3 bg-gray-200 rounded mb-3" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-[90%] bg-gray-200 rounded" />
            <div className="h-4 w-[85%] bg-gray-200 rounded" />
            <div className="h-4 w-[95%] bg-gray-200 rounded" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex py-3 items-center gap-4 flex-wrap">
          <div className="w-[200px] h-[42px] bg-gray-200 rounded-md" />
          <div className="w-[200px] h-[42px] bg-gray-200 rounded-md" />
        </div>
      </div>
    </div>
  )
}

export default loading
