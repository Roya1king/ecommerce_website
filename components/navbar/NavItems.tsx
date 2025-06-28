import React from 'react'
import Link from 'next/link'
import { FaCartShopping } from "react-icons/fa6";
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { signOutUser } from '@/lib/actions';
import { useCart } from '@/context/CartContext';
interface Props {
  mobile?: boolean
  loggedInUser?: {
    name: string;
    email: string;
    image: string;
  }
}

const NavItems = ({ mobile, loggedInUser }: Props) => {

  const {cartItemsCount}= useCart();

  return (
    <div className={cn("flex items-center justify-center gap-6", mobile ? "flex-col" : "flex-row ")}>

      {
        loggedInUser ?
          <>
            <div className="w-[50px] h-[50px] rounded-full overflow-hidden border-2 border-black shadow-md">
              <Image
                src={loggedInUser.image}
                alt="profile"
                width={50}
                height={50}
                className="object-cover w-full h-full"/>
            </div>

            <Link
              href="/profile"
              className="text-lg font-medium text-gray-900 hover:text-gray-700 transition"
            >
              {loggedInUser.name}
            </Link>

            <button onClick={signOutUser} className="nav-btn">Logout</button>
          </>
          :
          <Link href="/signin" className="nav-btn">Login</Link>
      }

      <div className="relative flex items-center h-[60px] w-[60px] justify-center cursor-pointer">
        <FaCartShopping className="text-4xl" />
        {cartItemsCount>0 && <span className="absolute top-0 right-0 px-2 py-1 bg-black rounded-full text-white">{cartItemsCount}</span>}
      </div>

    </div>
  );
}

export default NavItems