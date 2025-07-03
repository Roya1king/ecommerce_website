import React from 'react'

const loading = () => {
  return (
    <div className="main-max-width mx-auto padding-x py-9">
      <div className="flex flex-wrap justify-center gap-4 my-9">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="w-[260px] h-[360px] bg-gray-100 rounded-lg animate-pulse"
          >
            <div className="w-full h-[200px] bg-gray-300 rounded-t-lg" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default loading