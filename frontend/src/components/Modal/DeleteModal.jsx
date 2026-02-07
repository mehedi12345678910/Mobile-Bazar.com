import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment } from 'react'
import { HiOutlineExclamationTriangle } from 'react-icons/hi2'

const DeleteModal = ({ closeModal, isOpen, handleDelete }) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={closeModal}>
        {/* Backdrop Animation */}
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-slate-900/40 backdrop-blur-sm' />
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
              <DialogPanel className='w-full max-w-sm transform overflow-hidden rounded-[2.5rem] bg-white p-8 text-center shadow-2xl transition-all'>
                
                {/* Danger Icon */}
                <div className='mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 mb-6'>
                  <HiOutlineExclamationTriangle className='h-10 w-10 text-red-500' />
                </div>

                <DialogTitle
                  as='h3'
                  className='text-2xl font-black leading-tight text-slate-800'
                >
                  Confirm Delete?
                </DialogTitle>
                
                <div className='mt-3'>
                  <p className='text-sm text-slate-500 font-medium px-2'>
                    Are you sure you want to remove this? This action is permanent and cannot be undone.
                  </p>
                </div>

                {/* Buttons Section */}
                <div className='mt-10 flex flex-col sm:flex-row-reverse gap-3'>
                  <button
                    type='button'
                    className='w-full inline-flex justify-center rounded-2xl bg-red-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-200 hover:bg-red-600 transition-all active:scale-95'
                    onClick={() => {
                      handleDelete()
                      closeModal()
                    }}
                  >
                    Yes, Delete
                  </button>
                  <button
                    type='button'
                    className='w-full inline-flex justify-center rounded-2xl bg-slate-100 px-6 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-200 transition-all active:scale-95'
                    onClick={closeModal}
                  >
                    No, Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default DeleteModal