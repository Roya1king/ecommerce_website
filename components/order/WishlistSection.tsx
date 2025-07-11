import { auth } from '@/auth';
import { getWishlist } from '@/lib/api'
import { HeartOff } from 'lucide-react';
import React from 'react'
import MiniProductCard from './MiniProductCard';
import { WishlistType } from '@/lib/type';

const WishlistSection = async () => {
    const session = await auth();
    const loggedInUserEmail = session?.user?.email || null;
    const wishlists = await getWishlist(loggedInUserEmail);
    console.log("Wishlists:", wishlists);

    if (!wishlists) {
        return (
            <section className="main-max-width padding-x mx-auto my-16 text-center bg-white p-10 rounded-xl shadow-">
                <div className="flex flex-col items-center space-y-4">
                    <div className="bg-red-100 p-4 rounded-full shadow">
                        <HeartOff className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">
                        Your wishlist is empty
                    </h2>
                    <p className="text-gray-600 max-w-md">
                        You haven’t added any products to your wishlist yet. Start exploring
                        and save your favorites!
                    </p>
                </div>
            </section>
        );
    }
    return (
        <section className="main-max-width padding-x mx-auto my-10">
            <h2 className="text-center text-3xl font-bold text-gray-800 mb-8 max-sm:text-xl">
                Your Wishlist
            </h2>

            <div className="flex items-center w-[full] gap-4 px-6 py-6 custom-overflow border border-gray-200 bg-white rounded-lg shadow-sm">
                {wishlists.map((item: WishlistType) => (
                    <div key={item.id}>
                        <MiniProductCard item={item} />
                    </div>
                ))}
            </div>
        </section>

    )
}

export default WishlistSection