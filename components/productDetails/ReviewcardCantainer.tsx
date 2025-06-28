import React from 'react'
import { ProductDetail, Review } from '@/lib/type'
import { auth } from '@/auth';
import Collapse from '../uiComponents/Collapse';

const ReviewCardContainer = async({reviews,product}:{reviews:Review[],product:ProductDetail}) => {
  const session = await auth();
  const user=session?.user;


  return (
    <div className="main-max-width mx-auto padding-x ">
      <Collapse reviews={reviews} loggedInUser={user} product={product} />

      
    </div>
  )
}

export default ReviewCardContainer