import Container from '../../components/Shared/Container'
import Heading from '../../components/Shared/Heading'
import Button from '../../components/Shared/Button/Button'
import PurchaseModal from '../../components/Modal/PurchaseModal'
import { useState } from 'react'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'

const MobileDetails = () => {
  let [isOpen, setIsOpen] = useState(false)
  const { id } = useParams()

  const { data: mobile = {}, isLoading } = useQuery({
    queryKey: ['mobile', id],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/mobiles/${id}`)
      return result.data
    },
  })

  const closeModal = () => setIsOpen(false)
  if (isLoading) return <LoadingSpinner />

  const { image, name, description, category, quantity, price, seller } = mobile

  return (
    <div className='min-h-screen bg-white'>
      <Container>
        <div className='flex flex-col lg:flex-row gap-12 py-12'>
          
          {/* --- Left Side: Image Gallery Style --- */}
          <div className='flex-1 lg:sticky lg:top-24 h-fit'>
            <div className='bg-[#FBFBFB] rounded-[32px] p-10 border border-gray-100 flex items-center justify-center overflow-hidden group shadow-sm'>
              <img
                className='max-h-[550px] w-auto object-contain transition-transform duration-700 group-hover:scale-110'
                src={image}
                alt={name}
              />
            </div>
            
            {/* Trust Badges under image */}
            <div className='grid grid-cols-3 gap-4 mt-6'>
              <div className='bg-gray-50 p-4 rounded-2xl text-center'>
                <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>Original</p>
                <p className='text-xs font-semibold text-gray-700 mt-1'>100% Authentic</p>
              </div>
              <div className='bg-gray-50 p-4 rounded-2xl text-center'>
                <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>Warranty</p>
                <p className='text-xs font-semibold text-gray-700 mt-1'>1 Year Official</p>
              </div>
              <div className='bg-gray-50 p-4 rounded-2xl text-center'>
                <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>Delivery</p>
                <p className='text-xs font-semibold text-gray-700 mt-1'>Fast & Secured</p>
              </div>
            </div>
          </div>

          {/* --- Right Side: Product Info Section --- */}
          <div className='flex-1 px-4 lg:px-0'>
            {/* Category & Name */}
            <div className='space-y-4'>
              <span className='inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-[0.2em] rounded-full'>
                {category}
              </span>
              <h1 className='text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight'>
                {name}
              </h1>
            </div>

            {/* Price Tag */}
            <div className='mt-8 flex items-center gap-4'>
              <p className='text-5xl font-black text-blue-600'>${price}</p>
              <div className='h-10 w-[1px] bg-gray-200 mx-2'></div>
              <p className={`text-sm font-bold ${quantity > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {quantity > 0 ? `● IN STOCK (${quantity} units)` : '● OUT OF STOCK'}
              </p>
            </div>

            <hr className='my-10 border-gray-100' />

            {/* Description */}
            <div className='space-y-4'>
              <h3 className='text-lg font-bold text-gray-900'>Overview</h3>
              <p className='text-gray-500 leading-relaxed text-lg font-light'>
                {description}
              </p>
            </div>

            {/* Seller Card (Professional Look) */}
            <div className='mt-10 p-6 rounded-[24px] bg-gray-50 border border-gray-100 flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <img
                  className='rounded-full ring-4 ring-white shadow-lg'
                  height='60'
                  width='60'
                  src={seller?.image}
                  alt={seller?.name}
                />
                <div>
                  <p className='text-xs font-bold text-gray-400 uppercase leading-none mb-1'>Store Owner</p>
                  <p className='text-xl font-bold text-gray-800'>{seller?.name}</p>
                </div>
              </div>
              <button className='text-blue-600 font-bold text-sm hover:underline'>View Store</button>
            </div>

            {/* Action Buttons */}
            <div className='mt-10 flex flex-col sm:flex-row gap-4'>
              <div className='flex-1'>
                <Button 
                   onClick={() => setIsOpen(true)} 
                   label='Complete Purchase' 
                   outline={false}
                />
              </div>
              <button className='px-8 py-4 rounded-xl border-2 border-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-all'>
                Add to Wishlist
              </button>
            </div>
          </div>

        </div>
      </Container>

      {/* Modal remains same but trigger logic improved */}
      <PurchaseModal
        mobile={mobile}
        closeModal={closeModal}
        isOpen={isOpen}
      />
    </div>
  )
}

export default MobileDetails