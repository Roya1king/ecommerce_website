"use client"
import React from 'react'
import Image from "next/image"
import { Minus, Plus } from 'lucide-react'
import Button from '@/components/uiComponents/Button'
import { CartItemType } from '@/lib/type'
import { useCart } from '@/context/CartContext'
import { cartItemDeleteAction, cartItemUpdateAction } from '@/lib/actions'
import { toast } from 'react-toastify'
import DeleteModal from '../uiComponents/DeleteModal'

const CartItem = ({cartitem}:{cartitem:CartItemType}) => {

  const {cartCode,setCartItemsCount} =useCart();

  const subtotal=cartitem.subtotal.toFixed(2);

  const [quantity, setQuantity] = React.useState(cartitem.quantity);
  const [cartItemUpdateLoader , setCartItemUpdateLoader] = React.useState(false);
  const [counter,setCounter] = React.useState(0);

  function increaseQuantity() {
    setCounter(prev => prev + 1);
    setQuantity(prev => prev + 1);
  }

  function decreaseQuantity() {
    setCounter(prev => prev - 1);
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  }

  async function handleUpdatecart(){
    setCartItemUpdateLoader(true);
    const formData = new FormData();
    formData.set("quantity", quantity.toString());
    formData.set("cartitem_id", cartitem.id.toString());
    formData.set("cart_code", cartCode ? cartCode.toString() : "");

    try{
      await cartItemUpdateAction(formData);
      setCartItemsCount(prev => prev + counter);
      setCounter(0);
      toast.success("Cart updated successfully");
    }
    catch (error:unknown) {
      if (error instanceof Error) {
        toast.error("Failed to update cart: " + error.message);
        console.error("Error updating cart:", error.message);
      } else {
        toast.error("An unexpected error occurred while updating the cart.");
        console.error("An unexpected error occurred:", error);
      }
    }
    finally{
      setCartItemUpdateLoader(false);
    }
  }

  async function handleDeleteCartItem() {
    const formData = new FormData();
    formData.set("cartitem_id", cartitem.id.toString());
    formData.set("cart_code", cartCode ? cartCode.toString() : "");

    try{
      await cartItemDeleteAction(formData);
      setCartItemsCount(prev => prev - cartitem.quantity);
      toast.success("Cart item deleted successfully");
    }
    catch (error:unknown) {
      if (error instanceof Error) {
        toast.error("Failed to delete cart item: " + error.message);
        console.error("Error deleting cart item:", error.message);
      } else {
        toast.error("An unexpected error occurred while deleting the cart item.");
        console.error("An unexpected error occurred:", error);
      }
    }
  }

  return (
    <div className="flex items-center justify-between gap-6 border-b border-gray-200 py-4 mb-6 w-full flex-wrap bg-white px-4 rounded-lg shadow-sm">
    
        {/* Product Image */}
        <div className="relative overflow-hidden w-[70px] h-[70px] rounded-lg border border-gray-200">
          <Image
            src={ cartitem.product.image}
            alt="cartitem-img"
            className="object-cover"
            fill
          />
        </div>
    
        {/* Product Details - Name and Price */}
        <div className="flex-1 min-w-[120px]">
          <p className="font-semibold text-gray-800">{cartitem.product.name}</p>
          <p className="text-gray-600 text-sm mt-1">${cartitem.product.price}</p>
        </div>
    
        {/* Quantity Selector */}
        <div className="flex items-center justify-center gap-2 bg-gray-100 px-2 py-1 rounded-md">
          {/* Decrease Quantity Button */}
          <button onClick={decreaseQuantity} disabled={quantity <= 1}
            className="p-2 rounded-md bg-white border hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus className="w-5 h-5 text-gray-700" />
          </button>
    
          {/* Quantity Display */}
          <div className="w-[50px] h-[40px] flex items-center justify-center font-medium bg-white border border-gray-300 rounded-md shadow-sm">
            {quantity}
          </div>
    
          {/* Increase Quantity Button */}
          <button onClick={increaseQuantity}
            className="p-2 rounded-md bg-white border hover:bg-gray-200 transition"
          >
            <Plus className="w-5 h-5 text-gray-700" />
          </button>
        </div>
    
        {/* Subtotal Price */}
        <p className="text-lg font-semibold text-gray-800">${subtotal}</p>
    
        {/* Remove Item Button */}
        <DeleteModal handleDeleteCartItem={handleDeleteCartItem} deleteCartItem={true}/>
        {/* <button 
          className="p-2 rounded-md bg-red-50 hover:bg-red-100 transition text-red-500 border border-red-300"
        >
          <X className="w-5 h-5" />
        </button> */}
    
        {/* Update Cart Button */}
        <Button disabled={cartItemUpdateLoader} className='update-item-btn disabled:opacity-50 disabled:cursor-not-allowed' handleClick={handleUpdatecart} >
          {cartItemUpdateLoader ? "Updating..." : "Update Cart"}
        </Button>
     
      </div>
  )
}

export default CartItem;