import React from 'react'
import MiniProductCard from './MiniProductCard'
import { OrderItemType, OrderType } from '@/lib/type'
import { timeAgo } from '@/lib/utils'

const IndividualOrder = ({ order }: { order: OrderType }) => {
    return (
        <div className="w-full border border-gray-200 bg-white px-4 py-4 rounded-lg shadow-sm">
            {/* Order Header */}
            <div className="w-full bg-gray-50 px-4 py-3 rounded-md flex items-center justify-between shadow-sm border border-gray-200">
                <p className="text-sm sm:text-base font-medium text-gray-800 max-sm:hidden">
                    ORDER ID:{order.id}
                    <span className="text-green-600 font-semibold">
                        {order.stripe_checkout_id}
                    </span>
                </p>
                <small className="text-gray-500 text-xs sm:text-sm">{timeAgo(order.created_at)}</small>
            </div>

            {/* Order Items */}
            <div className="w-full py-4 flex items-center gap-4 custom-overflow">
                {order.items.map((item :OrderItemType) => {
                    return <MiniProductCard key={item.id} item={item} />;
                })}


            </div>


        </div>
    )
}

export default IndividualOrder