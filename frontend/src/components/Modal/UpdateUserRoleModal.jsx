import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useState } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import { HiOutlineUserGroup } from 'react-icons/hi2'

const UpdateUserRoleModal = ({ isOpen, closeModal, user, refetch }) => {
  const [updatedRole, setUpdatedRole] = useState(user?.role)
  const axiosSecure = useAxiosSecure()

  const handleRoleUpdate = async () => {
    try {
      await axiosSecure.patch('/update-role', {
        email: user?.email,
        role: updatedRole,
      })
      toast.success(`Role updated to ${updatedRole} successfully!`)
      refetch()
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update role")
    } finally {
      closeModal()
    }
  }

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={closeModal}>
        {/* Soft Dark Backdrop */}
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
              enterFrom='opacity-0 scale-95 translate-y-4'
              enterTo='opacity-100 scale-100 translate-y-0'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100 translate-y-0'
              leaveTo='opacity-0 scale-95 translate-y-4'
            >
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-[2.5rem] bg-white p-8 text-left align-middle shadow-2xl transition-all border border-slate-100'>
                
                {/* Icon & Title */}
                <div className='flex items-center gap-4 mb-6'>
                  <div className='p-3 bg-blue-50 text-blue-600 rounded-2xl'>
                    <HiOutlineUserGroup size={28} />
                  </div>
                  <div>
                    <DialogTitle as='h3' className='text-xl font-black text-slate-800 tracking-tight'>
                      Change User Role
                    </DialogTitle>
                    <p className='text-xs text-slate-400 font-bold uppercase tracking-wider'>Administration Control</p>
                  </div>
                </div>

                {/* User Preview Card */}
                <div className='bg-slate-50 p-4 rounded-2xl mb-6 border border-slate-100 flex items-center gap-3'>
                    <img 
                        src={user?.image || 'https://i.ibb.co/bc9996r/user.png'} 
                        className='w-12 h-12 rounded-full border-2 border-white shadow-sm' 
                        alt="" 
                    />
                    <div>
                        <p className='text-sm font-bold text-slate-800'>{user?.name || "Unknown User"}</p>
                        <p className='text-xs text-slate-500'>{user?.email}</p>
                    </div>
                </div>

                <div className='space-y-4'>
                  <label className='text-xs font-black text-slate-500 uppercase ml-1 tracking-widest'>Select New Designation</label>
                  <select
                    value={updatedRole}
                    onChange={e => setUpdatedRole(e.target.value)}
                    className='w-full bg-white border-2 border-slate-100 rounded-2xl px-4 py-3.5 text-slate-700 font-bold focus:border-blue-500 focus:ring-0 transition-all outline-none appearance-none cursor-pointer'
                    style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23cbd5e1%27 stroke-width=%273%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                  >
                    <option value='customer'>Customer (Buyer)</option>
                    <option value='seller'>Seller (Vendor)</option>
                    <option value='admin'>Administrator</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col sm:flex-row gap-3 mt-10'>
                  <button
                    onClick={handleRoleUpdate}
                    type='button'
                    className='flex-1 bg-slate-900 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95'
                  >
                    Save Changes
                  </button>
                  <button
                    type='button'
                    className='flex-1 bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold py-4 rounded-2xl transition-all'
                    onClick={closeModal}
                  >
                    Keep Current
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

export default UpdateUserRoleModal