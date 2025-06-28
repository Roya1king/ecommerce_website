"use client"
import { Star } from 'lucide-react'
import React, { useEffect } from 'react'
import { Textarea } from '../ui/textarea'
import Button from '../uiComponents/Button'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ProductDetail, Review } from '@/lib/type'
import { createReviewAction, updateReviewAction } from '@/lib/actions'
import { toast } from 'react-toastify';

interface Props {
    rating: number;
    review: string;
}

const ReviewForm = ({ product, loggedInUserEmail, review, updateReviewForm }:
    { product: ProductDetail, loggedInUserEmail: string | undefined | null, review: Review | undefined, updateReviewForm?: boolean }) => {


    const [customerReview, setCustomerReview] = useState("");
    const [reviewButtonLoader, setReviewButtonLoader] = useState(false);

    const [hoverRating, setHoverRating] = useState(0);
    const [hoverReview, setHoverreview] = useState("");

    const [clickedRating, setClickedRating] = useState(0);
    const [clickedReview, setClickedreview] = useState("");

    const handleClick = ({ rating, review }: Props) => {
        setClickedRating(rating);
        setClickedreview(review);
    }

    const handleHoverIn = ({ rating, review }: Props) => {
        setHoverRating(rating);
        setHoverreview(review);
    }

    const handleHoverOut = () => {
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

    useEffect(() => {
        if (!review) return; // Add this guard

        const { rating, review: reviewMessage } = review;
        if (updateReviewForm) {
            setClickedRating(rating);
            setCustomerReview(reviewMessage);
        }

        const ratingTag = ratings.find((item) => item.rating === rating);
        setClickedreview(ratingTag?.review || "");
    }, [review, updateReviewForm]);

    async function handleUpdateReview(e: React.FormEvent) {
        e.preventDefault();
        setReviewButtonLoader(true);
        const formData = new FormData();
        formData.set("slug", product.slug);
        formData.set("review", customerReview);
        formData.set("rating", String(clickedRating));
        formData.set("review_id", String(review?.id));

        try{
            await updateReviewAction(formData);
            toast.success("Review updated successfully!");
        }
        catch (error: unknown) {
            if (error instanceof Error) {
                toast.error("Error updating review: " + error.message);
                console.error("Error updating review:", error.message);
            } else {
                toast.error("An unexpected error occurred while updating the review.");
                console.error("An unexpected error occurred:", error);
            }
        }
        finally {
            setReviewButtonLoader(false);
            // setCustomerReview("");
            // setClickedRating(0);
            // setClickedreview("");
            // setHoverRating(0);
            // setHoverreview("");
        }
    }

    async function handleCreateReview(e: React.FormEvent) {
        e.preventDefault();
        setReviewButtonLoader(true);
        const formData = new FormData();
        formData.set("product_id", String(product.id));
        formData.set("slug", product.slug);
        formData.set("review", customerReview);
        formData.set("rating", String(clickedRating));
        formData.set("email", String(loggedInUserEmail));

        try {
            await createReviewAction(formData);
            toast.success("Review added successfully!");
        }
        catch (error: unknown) {
            if (error instanceof Error) {
                toast.error("Error creating review: " + error.message);
                console.error("Error creating review:", error.message);
            } else {
                toast.error("An unexpected error occurred while creating the review.");
                console.error("An unexpected error occurred:", error);
            }
        }
        finally {
            setReviewButtonLoader(false);
        }
    }

    return (
        <div className='w-full mx-auto bg-white rounded-xl p-6'>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
                Rate and review this product
            </h3>

            <div className='flex items-center justify-center gap-2 mb-4'>
                {ratings.map(({ rating, review }) => (
                    <Star key={rating}
                        onClick={() => handleClick({ rating, review })}
                        onPointerEnter={() => handleHoverIn({ rating, review })}
                        onPointerLeave={handleHoverOut}
                        className={cn('w-7 h-7 cursor-pointer text-gray-300 hover:text-black transition', rating <= hoverRating || rating <= clickedRating ? "fill-black" : "")}
                    />))}
            </div>


            <p className="text-center text-gray-600 text-sm">{hoverReview || clickedReview || "Please Rate"} </p>

            {/* review Form */}

            <form className="flex flex-col gap-4 mt-4" onSubmit={updateReviewForm ? handleUpdateReview : handleCreateReview} >
                <Textarea
                    name="content"
                    value={customerReview}
                    onChange={(e) => setCustomerReview(e.target.value)}
                    className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-lg p-3 w-full resize-none"
                    placeholder="Write your review..."
                    required
                />
                {/* <Button disabled={!!(reviewButtonLoader || clickedRating < 1 || (customerReview && customerReview.trim().length < 1) || reviewButtonLoader)}  
                    className="bg-black text-white w-full py-2 rounded-lg hover:bg-gray-900 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ">
                    {reviewButtonLoader ? "Adding review.." :  "Add Review"}
                </Button> */}
                <Button
                    disabled={
                        !!(
                            reviewButtonLoader ||
                            clickedRating < 1 ||
                            (customerReview && customerReview.trim().length < 1)
                        )
                    }
                    className="bg-black text-white w-full py-2 rounded-lg hover:bg-gray-900 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed "
                >
                    {reviewButtonLoader
                        ? updateReviewForm
                            ? "Updating review..."
                            : "Adding review..."
                        : updateReviewForm
                            ? "Update Review"
                            : "Add Review"}
                </Button>


            </form>


        </div>
    )
}

export default ReviewForm