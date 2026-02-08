import { Dialog, DialogTitle, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useState } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { HiOutlineBadgeCheck } from 'react-icons/hi'

const BecomeSellerModal = ({ closeModal, isOpen }) => {
  const axiosSecure = useAxiosSecure()
  const [loading, setLoading] = useState(false)



const handleRequest = async () => {
  setLoading(true)
  try {
    
    const { data } = await axiosSecure.post('/become-seller') 
    
    if (data.insertedId) {
      toast.success('Request sent! Please wait for admin approval.')
    }
    closeModal()
  } catch (err) {
    console.log(err)
    // Ebar toast-e ashol error message dekhabe
    const msg = 'আপনার ইমেইল অ্যাডমিন এর কাছে আছে সে চাইলে তোমাকে সেলার বানাই তে পারবে'
    toast(msg)
  } finally {
    setLoading(false)
  }
}

  return (
    <Transition grow show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={closeModal}>
        {/* Background Overlay with Blur */}
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-slate-900/60 backdrop-blur-sm' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-[40px] bg-white p-10 text-left align-middle shadow-2xl transition-all border border-slate-100'>
                
                {/* Icon & Title */}
                <div className='flex flex-col items-center text-center'>
                  <div className='p-4 bg-blue-50 rounded-3xl text-blue-600 mb-6'>
                    <HiOutlineBadgeCheck size={48} />
                  </div>
                  <DialogTitle
                    as='h3'
                    className='text-3xl font-black text-slate-900 leading-tight tracking-tight'
                  >
                    Become A <span className='text-blue-600'>Seller</span>
                  </DialogTitle>
                  <p className='mt-4 text-slate-500 font-medium'>
                    Want to start selling your products? Send a request to our admin. 
                    Please review our <span className='text-blue-500 underline cursor-pointer'>Seller Policies</span>.
                  </p>
                </div>

                <div className='mt-10 flex flex-col gap-3'>
                  {/* Action Button */}
                  <button
                    disabled={loading}
                    onClick={handleRequest}
                    className='w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-200 active:scale-95 disabled:bg-slate-400'
                  >
                    {loading ? (
                      <TbFidgetSpinner className='animate-spin' size={20} />
                    ) : (
                      'Send Request Now'
                    )}
                  </button>

                  {/* Cancel Button */}
                  <button
                    type='button'
                    onClick={closeModal}
                    className='w-full py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors uppercase text-xs tracking-widest'
                  >
                    Maybe Later
                  </button>
                </div>

                {/* Secure Badge */}
                <div className='mt-8 pt-6 border-t border-slate-50 flex justify-center items-center gap-2 text-slate-300'>
                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                   </svg>
                   <span className='text-[10px] font-black uppercase tracking-widest'>Secure Application</span>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default BecomeSellerModal