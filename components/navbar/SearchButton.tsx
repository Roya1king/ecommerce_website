import React from 'react'
import { Search } from 'lucide-react'
import { X } from 'lucide-react'

interface Props{
    handleSearchClick:()=>void,
    showSearchBar:boolean
}

const SearchButton = ({ handleSearchClick ,showSearchBar}:Props) => {
  return (
    <button 
      onClick={handleSearchClick}
      className="flex size-[30px] rounded-full bg-black justify-center items-center cursor-pointer text-white"
    >
      {showSearchBar ? <X className="size-4"/> : <Search className="size-4" />}
    </button>
  );
};


export default SearchButton