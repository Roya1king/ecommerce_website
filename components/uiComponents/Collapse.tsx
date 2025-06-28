"use client"
import React from 'react'
import { useState } from 'react'
import { ChevronsUpDown } from "lucide-react"
import { User } from "next-auth"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { ProductDetail, Review } from '@/lib/type'
import ReviewCard from '../productDetails/ReviewCard'

const Collapse = ({ reviews,loggedInUser,product }: { reviews: Review[],loggedInUser:User | undefined |null,product:ProductDetail }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-full flex-col gap-4"
    >
      <div className="flex items-center justify-between gap-4 px-4">
        <h4 className="my-4 font-semibold">{reviews.length < 2 ? "Review" : "Reviews"}</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <ChevronsUpDown />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      {!isOpen && <ReviewCard key={reviews[0].id} review={reviews[0]} loggedInUser={loggedInUser} product={product}/>}
      <CollapsibleContent className="flex flex-col gap-2">
      {reviews.map((review) =><ReviewCard key={review.id} review={review} loggedInUser={loggedInUser} product={product}/> )}
      </CollapsibleContent>
    </Collapsible>
  )
}

export default Collapse