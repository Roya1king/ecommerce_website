"use client";
import React from 'react'
import Button from '../uiComponents/Button'
import { useCart } from '@/context/CartContext';
import { intiatePayment } from '@/lib/api';

const CartSummary = ({total,loggedInUserEmail}:{total:number,loggedInUserEmail:string | null | undefined}) => {
  const tax=5;
  const sub_total=Number(total);
  const cart_total=(sub_total+tax).toFixed(2);
  const [initiatePaymentLoader, setInitiatePaymentLoader] = React.useState(false);

  const { cartCode} = useCart();

  async function handleCheckout() {
    setInitiatePaymentLoader(true);
    const paymentInfo = {email: loggedInUserEmail, cart_code: cartCode ? cartCode.toString() : ""};
    try{
      const response = await intiatePayment(paymentInfo);
      console.log("Payment initiated successfully:", response);
      window.location.href = response.data.url;
    }
    catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error initiating payment:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
    finally{
      setInitiatePaymentLoader(false);
    }
  }
  return (
    <div className="w-[400px] max-lg:w-full border border-gray-200 rounded-lg shadow-md bg-white px-8 py-6">
    <h2 className="font-semibold text-2xl text-gray-800 mb-6">Order Summary</h2>

    <div className="w-full flex items-center justify-between py-2">
      <p className="text-gray-600 font-medium">Subtotal</p>
      <p className="text-gray-800 font-semibold">${sub_total.toFixed(2)}</p>
    </div>

    <div className="w-full flex items-center justify-between py-2">
      <p className="text-gray-500 font-medium">Estimated Tax</p>
      <p className="text-gray-800 font-semibold">${tax}</p>
    </div>

    <hr className="my-4 border-gray-300" />

    <div className="w-full flex items-center justify-between py-2">
      <p className="text-lg font-semibold text-gray-800">Total</p>
      <p className="text-lg font-bold text-black">${cart_total}</p>
    </div>

  

    <Button handleClick={handleCheckout}  className='checkout-btn' disabled={Boolean(!loggedInUserEmail) || total<=0 || initiatePaymentLoader}  >
    {loggedInUserEmail ? initiatePaymentLoader ? "redirecting to stripe" : "Proceed to Checkout" : "Login to Checkout"}
    </Button>

  </div>
  )
}

export default CartSummary