import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { IoCheckmarkCircle } from 'react-icons/io5'

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, { sessionId })
        .then(() => setLoading(false))
        .catch(() => setLoading(false))
    }
  }, [sessionId])

  return (
    <div className='min-h-[80vh] flex items-center justify-center bg-gray-50 px-4'>
      <div className='max-w-md w-full bg-white p-8 md:p-12 rounded-3xl shadow-2xl text-center transform transition-all hover:scale-105'>
        
        {/* Animated Icon Section */}
        <div className='relative flex justify-center mb-6'>
          <div className='absolute inset-0 bg-green-100 rounded-full scale-150 animate-pulse opacity-50'></div>
          <IoCheckmarkCircle className='relative w-20 h-20 text-green-500 z-10' />
        </div>

        {/* Text Content */}
        <h1 className='text-4xl font-extrabold text-gray-900 mb-3 tracking-tight'>
          Congratulations!
        </h1>
        <p className='text-lg text-gray-500 mb-2'>
          Payment successful & order placed.
        </p>
        <p className='text-sm text-gray-400 mb-8 px-4'>
          Thank you for your purchase. We've sent a confirmation email with your order details.
        </p>

        {/* Action Buttons */}
        <div className='space-y-3'>
          <Link
            to='/dashboard/my-orders'
            className='block w-full bg-lime-500 hover:bg-lime-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-lime-200 transition-all duration-300'
          >
            Track My Order
          </Link>
          
          <Link
            to='/'
            className='block w-full text-gray-500 hover:text-gray-800 font-medium py-2 transition-colors'
          >
            Continue Shopping
          </Link>
        </div>

        {/* Footer Note */}
        {sessionId && (
          <p className='mt-8 text-[10px] text-gray-300 uppercase tracking-widest'>
            Session ID: {sessionId.substring(0, 15)}...
          </p>
        )}
      </div>
    </div>
  )
}

export default PaymentSuccess