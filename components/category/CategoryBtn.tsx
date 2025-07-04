"use client"
import React from 'react'
import Image from "next/image"
import { category } from '@/lib/type'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'


const CategoryBtn = ({ cat }: { cat: category }) => {

  const pathname = usePathname();
  console.log(pathname);
  const btnPath = `/categories/${cat.slug}`;
  // console.log(pathname, btnPath);

  return (
    <Link href={`/categories/${cat.slug}`} className="no-underline">
      <button className={cn("cat-btn cursor-pointer",pathname == btnPath ? "bg-black" : "bg-gradient-to-r from-gray-100 to-gray-200")}>
        {/* Icon Container */}
        <div className="w-[40px] h-[40px] bg-white rounded-full overflow-hidden flex items-center justify-center shadow-sm">
          <Image
            src={cat.image}
            width={30}
            height={30}
            className="object-contain"
            alt="thumbnail"
          />
        </div>

        {/* Category Name */}
        <p className={cn(
          "font-semibold  text-[16px]",
          pathname == btnPath ? "text-white" : "text-gray-800"
        )}>{cat.name}</p>
      </button>
    </Link>
  )
}

export default CategoryBtn