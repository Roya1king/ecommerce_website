"use client";
import Link from 'next/link'
import React from 'react'
import SearchForm from './SearchForm'
import NavItems from './NavItems'
import MobileNavBar from './MobileNavBar'
import SearchButton from './SearchButton'
import { useState } from 'react'

//need to import some custom classname ike padding-x
const NavBar = () => {

  const [showSearchBar,setShowSearchBar] = useState(false);

  const handleSearchClick = () =>{
    setShowSearchBar(curr=>!curr);
  }

  return (
    <>
    <nav className="bg-[whitesmoke] sticky top-0 z-20 w-full py-4">
      <div className="flex justify-between items-center main-max-width mx-auto padding-x">

        <Link href=''>
          <h1 className="text-2xl font-extrabold text-gray-900"> Shoppit </h1>
        </Link>

        <div className="max-lg:hidden">
          <SearchForm />
        </div>

        <div className='max-lg:block hidden'>
          <SearchButton 
          handleSearchClick ={handleSearchClick} showSearchBar={showSearchBar}
          />
        </div>

        <div className="max-md:hidden">
          <NavItems />
        </div>

        <div className="max-md:block hidden">
          <MobileNavBar />
        </div>
      </div>
    </nav>

    {showSearchBar && (
      <div className="w-[300px] mx-auto max-lg:block hidden">
        <SearchForm />
      </div>
    )}

    </>
  )
}

export default NavBar