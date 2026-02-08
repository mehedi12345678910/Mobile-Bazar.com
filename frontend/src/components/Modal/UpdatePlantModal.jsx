import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment } from 'react'
import { HiOutlineXMark } from 'react-icons/hi2'
import UpdatePlantForm from '../Form/UpdatePlantForm'

const UpdatePlantModal = ({ setIsEditModalOpen, isOpen, mobileData }) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog 
        as='div' 
        className='relative z-50' 
        onClose={() => setIsEditModalOpen(false)}
      >
        {/* Deep Backdrop Blur */}
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-slate-900/50 backdrop-blur-md' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95 translate-y-8'
              enterTo='opacity-100 scale-100 translate-y-0'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100 translate-y-0'
              leaveTo='opacity-0 scale-95 translate-y-8'
            >
              <DialogPanel className='w-full max-w-xl transform overflow-hidden rounded-[2.5rem] bg-white p-8 text-left align-middle shadow-2xl transition-all border border-slate-100'>
                
                {/* Header with Close Button */}
                <div className='flex justify-between items-start mb-6'>
                  <div>
                    <DialogTitle
                      as='h3'
                      className='text-2xl font-black text-slate-800 tracking-tight'
                    >
                      Update <span className='text-blue-600'>Product</span> Details
                    </DialogTitle>
                    <p className='text-sm text-slate-400 mt-1 font-medium'>
                      Modify information for: <span className='text-slate-600 font-bold'>"{mobileData?.name || 'Mobile'}"</span>
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className='p-2 rounded-full bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 hover:rotate-90 transition-all duration-300 shadow-inner'
                  >
                    <HiOutlineXMark className='w-6 h-6' />
                  </button>
                </div>

                {/* Form Wrapper */}
                <div className='mt-2 w-full bg-slate-50/50 p-6 rounded-3xl border border-slate-100/50 shadow-inner'>
                  <UpdatePlantForm setIsEditModalOpen={setIsEditModalOpen} mobileData={mobileData} />
                </div>

                {/* Footer Note */}
                <p className='mt-6 text-[11px] text-center text-slate-400 uppercase tracking-[2px] font-bold'>
                   All changes are synchronized in real-time
                </p>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default UpdatePlantModal