import Link from 'next/link'
import React from 'react'

const FailedMessage = () => {
  return (
    <section className="bg-gradient-to-br from-red-50 to-red-100 px-6 py-20 text-center">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-semibold text-red-900 leading-snug">
          ❌ Payment Failed
        </h1>
        <p className="text-lg md:text-xl text-red-800 max-w-2xl mx-auto">
          Something went wrong while processing your payment. Please try again or contact support if the issue persists.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link
            href="/cart"
            className="inline-block px-6 py-3 rounded-full bg-red-700 text-white text-base font-medium hover:bg-red-800 transition duration-300"
          >
            Retry Checkout
          </Link>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-full bg-black text-white text-base font-medium hover:bg-gray-800 transition duration-300"
          >
            Continue Browsing
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FailedMessage
