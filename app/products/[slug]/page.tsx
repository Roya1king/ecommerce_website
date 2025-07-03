import { auth } from "@/auth";
import ProductSection from "@/components/home/ProductSection";
import ProductInfo from "@/components/productDetails/ProductInfo";
import RatingProgressBar from "@/components/productDetails/RatingProgressBar";
import ReviewCardContainer from "@/components/productDetails/ReviewcardCantainer";
import ReviewForm from "@/components/productDetails/ReviewForm";
import Modal from "@/components/uiComponents/Modal";
import { getProduct } from "@/lib/api";
import { Product, ProductDetail } from "@/lib/type";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import Link from "next/link";
import React from "react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } =await params;
  const product : Product= await getProduct(slug);

  return {
    title: `${product.name} - Shoppit`,
  };
}


const ProductPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } =await params;
  const product: ProductDetail = await getProduct(slug);
  const avreageRating = product.rating?.average_rating ?? 0;


  const stars = [1, 2, 3, 4, 5];
  const starRating = Math.floor(avreageRating);

  const similar_product = product.similar_products;

  const session = await auth();
  const loggedInUser = session?.user;
  const loggedInUserEmail = loggedInUser?.email;

  const userHaveReview = product.reviews.some((review) => review.user.email === loggedInUserEmail);

  return (
    <>
      <ProductInfo product={product} loggedInUserEmail={loggedInUserEmail}/>

      <div className="main-max-width padding-x mx-auto ">
        <h3 className="font-semibold text-xl text-center my-6 text-gray-800">
          Customer Reviews
        </h3>

        <div className="w-full flex py-6 gap-6 flex-wrap items-center justify-between max-md:justify-center">
          {/* Rating display box */}
          <div className="w-[250px] h-[250px] bg-gray-100 rounded-lg px-4 py-6 flex flex-col gap-3 items-center justify-center shadow-lg">
            <h1 className="text-5xl font-bold text-gray-800">{avreageRating}</h1>
            <small className="text-gray-600 text-sm">
              of {product.rating?.total_reviews ?? 0} {(product.rating?.total_reviews ?? 0) === 1 ? "review" : "reviews"}
            </small>



            <div className="flex gap-2">
              {stars.map((star) => <Star key={star} className={cn("w-5 h-5 cursor-pointer", star <= starRating ? "fill-black" : "fill-gray-100")} />)}
              {/* <Star className="fill-black w-5 h-5 cursor-pointer" /> */}
            </div>
          </div>
          {/* Rating Display Box ends */}

          {/* Rating progress bar */}

          <div className="flex flex-col gap-6 w-[700px] max-md:w-full">
            <RatingProgressBar rating="Excellent" numRating={product.excellent_review} />
            <RatingProgressBar rating="Very Good" numRating={product.very_good_review} />
            <RatingProgressBar rating="Good" numRating={product.good_review} />
            <RatingProgressBar rating="Fair" numRating={product.fair_review} />
            <RatingProgressBar rating="Poor" numRating={product.poor_review} />
          </div>

          {/* Rating progress bar ends */}
        </div>

        {/* Review modal form */}

        <div className="flex justify-center items-center w-full mb-5">
          {
            loggedInUser ?  <Modal userHaveReview={userHaveReview}><ReviewForm review={undefined} product={product} loggedInUserEmail={loggedInUserEmail} /></Modal> :
              <Link href="/signin" className="default-btn max-sm:text-[12px] max-sm:px-4 my-6">Sign In to add a review </Link>
          }
        </div>

        {/* Review modal form ends */}

      </div>
      {product.reviews.length > 0 && <ReviewCardContainer reviews={product.reviews} product={product} />}
      <ProductSection title="Product From the Same Category" similar_products={similar_product}  detailPage />
    </>
  );
};

export default ProductPage;
