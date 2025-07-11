"use client"
import React, {  useEffect, useState } from 'react'
import Image from "next/image"
import Button from '../uiComponents/Button'
import { ProductDetail } from '@/lib/type'
import { api, BASE_URL } from '@/lib/api'
import { addToCartAction } from '@/lib/actions'
import { toast } from 'react-toastify'
import { useCart } from '@/context/CartContext'
import WishlistToolTrip from '../uiComponents/WishlistToolTrip'

const ProductInfo = ({ product, loggedInUserEmail }: { product: ProductDetail, loggedInUserEmail: string | null | undefined }) => {
  console.log(BASE_URL + product.image);
  const { cartCode, setCartItemsCount } = useCart();
  const [addToCartLoader, setAddToCartLoader] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [loadingProductInCart, setLoadingProductInCart] = useState(true);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [addWishlistLoader, setAddWishlistLoader] = useState(false);


  useEffect(() => {
    async function handleAddedToCart() {
      setLoadingProductInCart(true);
      try {
        const response = await api.get(`product_in_cart?cart_code=${cartCode}&product_id=${product.id}`);
        setAddedToCart(response.data.product_in_cart);
        return response.data;
      }
      catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error adding to cart:", error.message);
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
      finally {
        setLoadingProductInCart(false);
      }
    }
    handleAddedToCart();
  }, [cartCode, product.id]);

  async function handleAddToCart() {
    setAddToCartLoader(true);
    if (!cartCode) {
      toast.error("Cart not ready yet. Please wait a moment.");
      return;
    }
    const formData = new FormData();
    formData.set("cart_code", cartCode);
    formData.set("product_id", product.id.toString());
    try {
      const response = await addToCartAction(formData);
      setAddedToCart(true);
      setCartItemsCount((prevCount) => prevCount + 1);
      toast.success("Item Added to Cart..");
      return response;
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error adding to cart:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
    finally {
      setAddToCartLoader(false);
    }
  }

  async function handleAddToWishlist() {
    setAddWishlistLoader(true);
    const formData = new FormData();
    formData.set("product_id", product.id.toString());
    formData.set("email", loggedInUserEmail || "");

    try{
      await api.post("add_to_wishlist/", formData);
      setAddedToWishlist(curr=>!curr);
      toast.success("Product added to wishlist.");
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error adding to wishlist:", error.message);
        toast.error("Failed to add product to wishlist.");
      } else {
        console.error("An unexpected error occurred:", error);
        toast.error("An unexpected error occurred while adding to wishlist.");
      }
    }
    finally{
      setAddWishlistLoader(false);
    }
  }

  useEffect(() => {
    async function checkWishlistStatus() {
      if (loggedInUserEmail) {
        try {
          const response = await api.get(`product_in_wishlist?email=${loggedInUserEmail}&product_id=${product.id}`);
          setAddedToWishlist(response.data.product_in_wishlist);
        }
        catch (error: unknown) {
          if (error instanceof Error) {
            console.error("Error checking wishlist status:", error.message);
          } else {
            console.error("An unexpected error occurred:", error);
          }
        }
      }
    }
    checkWishlistStatus();
  }, [loggedInUserEmail, product.id]);

  return (
    <div className="bg-gray-50 padding-x py-10 flex items-start flex-wrap gap-12 main-max-width padding-x mx-auto">
      {/* Product Image */}

      <div className="w-[350px] h-[400px] relative overflow-hidden rounded-lg shadow-sm border border-gray-200">
        <Image
          src={BASE_URL + product.image}
          alt="gaming"
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col gap-6 max-w-[500px] max-md:w-full">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <h3 className="text-2xl font-semibold text-black">${product.price}</h3>

        </div>

        {/* Product Details */}
        <div>
          <h3 className="font-medium text-lg mb-3">Details</h3>
          <p className="text-gray-600 text-justify leading-6 text-[14px] max-md:text-[12px]">
            {/* {product.description} */}
            {product.description || "No description available for this product."}
          </p>
        </div>

        {/* Buttons */}
        <div className='flex py-3 items-center gap-4 flex-wrap border'>
          <Button disabled={addToCartLoader || addedToCart || loadingProductInCart} handleClick={handleAddToCart} className="default-btn disabled:opacity-50 disabled:cursor-not-allowed">
            {addToCartLoader ? "Adding To Cart..." : addedToCart ? "Added To Cart" : "Add to Cart"}
          </Button>

          {loggedInUserEmail ? <Button handleClick={handleAddToWishlist} disabled={addWishlistLoader} className="wish-btn disabled:opacity-50 disabled:cursor-not-allowed">{addWishlistLoader ? "Updating..." : addedToWishlist ?  "Remove from Wishlist" : "Add to Wishlist"}</Button>
            : <WishlistToolTrip loggedInUserEmail={loggedInUserEmail}/>}
        </div>

      </div>
    </div>
  )
}

export default ProductInfo

