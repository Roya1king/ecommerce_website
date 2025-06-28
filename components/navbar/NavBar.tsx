"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import SearchForm from './SearchForm'
import NavItems from './NavItems'
import MobileNavBar from './MobileNavBar'
import SearchButton from './SearchButton'

// Define the User interface to type the props
interface User {
  name: string;
  email: string;
  image: string;
}

interface NavBarProps {
  loggedInUser?: User;
}

const NavBar = ({ loggedInUser }: NavBarProps) => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearchClick = () => {
    setShowSearchBar(curr => !curr);
  }

  return (
    <>
      <nav className="bg-[whitesmoke] sticky top-0 z-20 w-full py-4">
        <div className="flex justify-between items-center main-max-width mx-auto padding-x">

          <Link href='/'>
            <h1 className="text-2xl font-extrabold text-gray-900"> Shoppit </h1>
          </Link>

          <div className="max-lg:hidden">
            <SearchForm />
          </div>

          <div className='max-lg:block hidden'>
            <SearchButton
              handleSearchClick={handleSearchClick} showSearchBar={showSearchBar}
            />
          </div>

          <div className="max-md:hidden">
            <NavItems loggedInUser={loggedInUser} />
          </div>

          <div className="max-md:block hidden">
            <MobileNavBar loggedInUser={loggedInUser} />
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