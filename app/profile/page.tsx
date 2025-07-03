import React, { Suspense } from 'react'
import PurchasedOrder from '@/components/order/PurchasedOrder'
import WishlistSection from '@/components/order/WishlistSection'
import ProductCardSkeleton from '@/components/home/ProductCardSkeleton'
import AddressFormContainer from '@/components/order/AddressFormContainer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profile - Shoppit',
}

const ProfilePage = () => {
  return (
    <>
    <div className='main-max-width padding-x py-6 flex-center mx-auto'>
    <AddressFormContainer/>
    </div>
    <Suspense fallback={<ProductCardSkeleton/>}><PurchasedOrder /></Suspense>
    <Suspense fallback={<ProductCardSkeleton/>}><WishlistSection /></Suspense>
    </>
  )
}

export default ProfilePage