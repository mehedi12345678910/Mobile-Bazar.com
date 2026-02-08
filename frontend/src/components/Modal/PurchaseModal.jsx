import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment } from 'react'
import useAuth from '../../hooks/useAuth'
import axios from 'axios'
import { HiOutlineShieldCheck, HiOutlineShoppingBag } from 'react-icons/hi2'

const PurchaseModal = ({ closeModal, isOpen, mobile }) => {
  const { user } = useAuth()
  const { _id, name, category, price, image, seller } = mobile || {}

  const handlePayment = async () => {
    try {
      const paymentInfo = {
        mobileId: _id,
        name,
        category,
        price,
        image,
        quantity: 1,
        seller,
        customer: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
      }
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checkout-session`,
        paymentInfo
      )
      window.location.href = data.url
    } catch (err) {
      console.error("Payment initiation failed", err)
    }
  }

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-slate-900/60 backdrop-blur-md' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95 translate-y-4'
              enterTo='opacity-100 scale-100 translate-y-0'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100 translate-y-0'
              leaveTo='opacity-0 scale-95 translate-y-4'
            >
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-[2.5rem] bg-white p-0 text-left align-middle shadow-2xl transition-all'>
                
                {/* Header Image/Banner */}
                <div className='relative h-32 bg-lime-500 flex items-center justify-center'>
                    <HiOutlineShoppingBag className='text-white/20 absolute inset-0 w-full h-full p-4' />
                    <DialogTitle as='h3' className='text-2xl font-black text-white z-10'>
                        Checkout Summary
                    </DialogTitle>
                </div>

                <div className='p-8'>
                    {/* Product Info Card */}
                    <div className='flex items-center gap-4 bg-slate-50 p-4 rounded-2xl mb-6'>
                        <img src={image} alt={name} className='w-16 h-16 object-cover rounded-xl shadow-sm' />
                        <div>
                            <h4 className='font-bold text-slate-800'>{name}</h4>
                            <p className='text-xs text-slate-500 uppercase tracking-wider font-semibold'>{category}</p>
                        </div>
                        <div className='ml-auto text-right'>
                            <p className='font-black text-slate-900 text-lg'>${price}</p>
                        </div>
                    </div>

                    {/* Order Details */}
                    <div className='space-y-3 mb-8 px-2'>
                        <div className='flex justify-between text-sm'>
                            <span className='text-slate-400 font-medium'>Customer</span>
                            <span className='text-slate-800 font-bold'>{user?.displayName}</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-slate-400 font-medium'>Billing Email</span>
                            <span className='text-slate-800 font-bold'>{user?.email}</span>
                        </div>
                        <div className='border-t border-dashed border-slate-200 pt-3 flex justify-between items-center'>
                            <span className='text-slate-900 font-black text-lg'>Total Payable</span>
                            <span className='text-lime-600 font-black text-2xl'>${price}</span>
                        </div>
                    </div>

                    {/* Security Badge */}
                    <div className='flex items-center justify-center gap-2 mb-8 bg-blue-50 py-2 rounded-full'>
                        <HiOutlineShieldCheck className='text-blue-500' />
                        <span className='text-[10px] font-bold text-blue-600 uppercase tracking-widest'>Secure SSL Encrypted Payment</span>
                    </div>

                    {/* Actions */}
                    <div className='flex flex-col gap-3'>
                        <button
                            onClick={handlePayment}
                            className='w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl shadow-xl transition-all active:scale-95'
                        >
                            Proceed to Payment
                        </button>
                        <button
                            onClick={closeModal}
                            className='w-full text-slate-400 hover:text-slate-600 font-semibold py-2 transition-all'
                        >
                            Review Again
                        </button>
                    </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default PurchaseModal