"use client"
import { Star } from 'lucide-react'
import React from 'react'
import { Textarea } from '../ui/textarea'
import Button from '../uiComponents/Button'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Props{
    rating:number;
    review:string;
}

const ReviewForm = () => {

    const [hoverRating,setHoverRating]= useState(0);
    const [hoverReview,setHoverreview]=useState("");

    const [clickedRating,setClickedRating]= useState(0);
    const [clickedReview,setClickedreview]=useState("");

    const handleClick = ({rating,review}:Props) =>{
        setClickedRating(rating);
        setClickedreview(review);
    }

    const handleHoverIn = ({rating,review}:Props)=>{
        setHoverRating(rating);
        setHoverreview(review);
    }

    const handleHoverOut = () =>{
        setHoverRating(clickedRating);
        setHoverreview(clickedReview);
    }

    const ratings = [
        { rating: 1, review: "Poor" },
        { rating: 2, review: "Fair" },
        { rating: 3, review: "Good" },
        { rating: 4, review: "Very Good" },
        { rating: 5, review: "Excellent" },
    ];
    return (
        <div className='w-full mx-auto bg-white rounded-xl p-6'>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
                Rate and review this product
            </h3>

            <div className='flex items-center justify-center gap-2 mb-4'>
                {ratings.map(({rating,review})=>(
                    <Star key={rating} 
                    onClick={()=>handleClick({rating,review})}
                    onPointerEnter={()=>handleHoverIn({rating,review})}
                    onPointerLeave={handleHoverOut}
                    className={cn('w-7 h-7 cursor-pointer text-gray-300 hover:text-black transition',rating<=hoverRating || rating<=clickedRating ? "fill-black":"") }
                    />))}
            </div>


            <p className="text-center text-gray-600 text-sm">{hoverReview || clickedReview ||  "Please Rate"} </p>

            {/* review Form */}

            <form className="flex flex-col gap-4 mt-4" >
                <Textarea
                    name="content"
                    className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-lg p-3 w-full resize-none"
                    placeholder="Write your review..."
                    required
                />
                <Button className="bg-black text-white w-full py-2 rounded-lg hover:bg-gray-900 transition">
                    Add Review
                </Button>

            </form>


        </div>
    )
}

export default ReviewForm