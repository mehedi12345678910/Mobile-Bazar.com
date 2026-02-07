import useAuth from '../../../hooks/useAuth'
import coverImg from '../../../assets/images/cover.jpg'
import useRole from '../../../hooks/useRole'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import { useState } from 'react'
import toast from 'react-hot-toast'

const Profile = () => {
  const { user, updateUserProfile, resetPassword } = useAuth()
  const [role, isRoleLoading] = useRole()
  const [isEditOpen, setIsEditOpen] = useState(false)

  if (isRoleLoading) return <LoadingSpinner />

  // Profile Update Handler
  const handleUpdate = async (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const photo = e.target.photo.value
    try {
      await updateUserProfile(name, photo)
      toast.success('Profile Updated Successfully!')
      setIsEditOpen(false)
    } catch (err) {
      toast.error(err.message)
    }
  }

  // Password Reset Handler
  const handleResetPassword = async () => {
    try {
      await resetPassword(user?.email)
      toast.success('Password reset email sent! Check your inbox.')
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-[#F8F9FA] py-12 px-4'>
      <div className='bg-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] rounded-[48px] w-full max-w-2xl overflow-hidden relative'>
        
        {/* Cover Section */}
        <div className='h-52 bg-gradient-to-r from-blue-600 to-indigo-700 relative'>
          <img src={coverImg} className='w-full h-full object-cover opacity-40' alt="cover" />
          <div className='absolute inset-0 bg-black/10'></div>
        </div>

        {/* Profile Details */}
        <div className='px-10 pb-12 text-center'>
          <div className='relative -mt-20 inline-block'>
            <img
              src={user?.photoURL}
              className='h-40 w-40 rounded-[40px] border-[6px] border-white shadow-2xl object-cover'
              alt="profile"
            />
            <button 
              onClick={() => setIsEditOpen(true)}
              className='absolute bottom-2 right-2 bg-blue-600 p-3 rounded-2xl text-white shadow-lg hover:bg-blue-700 transition-all'
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          </div>

          <div className='mt-6'>
            <h2 className='text-4xl font-black text-slate-900 leading-tight'>{user?.displayName}</h2>
            <span className='inline-block mt-3 px-6 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full'>
              {role}
            </span>
          </div>

          <div className='mt-10 grid grid-cols-1 gap-4 text-left'>
            <div className='p-6 bg-slate-50 rounded-[32px] border border-slate-100'>
              <p className='text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1'>Registered Email</p>
              <p className='text-lg font-bold text-slate-800'>{user?.email}</p>
            </div>
          </div>

          {/* Actions */}
          <div className='mt-8 flex flex-col gap-4'>
            <button 
              onClick={() => setIsEditOpen(true)}
              className='w-full bg-slate-900 text-white font-bold py-5 rounded-[24px] hover:bg-black transition-all shadow-xl shadow-slate-200 active:scale-95'
            >
              Update Profile Details
            </button>
            <button 
              onClick={handleResetPassword}
              className='w-full bg-white text-slate-900 border-2 border-slate-100 font-bold py-5 rounded-[24px] hover:bg-slate-50 transition-all'
            >
              Send Password Reset Email
            </button>
          </div>
        </div>

        {/* --- EDIT MODAL --- */}
        {isEditOpen && (
          <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4'>
            <div className='bg-white rounded-[40px] p-10 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-300'>
              <h3 className='text-2xl font-black text-slate-900 mb-6'>Edit Profile</h3>
              <form onSubmit={handleUpdate} className='space-y-6'>
                <div>
                  <label className='text-xs font-black uppercase text-slate-400 ml-2'>Display Name</label>
                  <input 
                    name="name" 
                    defaultValue={user?.displayName}
                    className='w-full mt-1 p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold'
                  />
                </div>
                <div>
                  <label className='text-xs font-black uppercase text-slate-400 ml-2'>Photo URL</label>
                  <input 
                    name="photo" 
                    defaultValue={user?.photoURL}
                    className='w-full mt-1 p-4 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold'
                  />
                </div>
                <div className='flex gap-4 pt-4'>
                  <button 
                    type='button'
                    onClick={() => setIsEditOpen(false)}
                    className='flex-1 py-4 font-bold text-slate-500 hover:bg-slate-50 rounded-2xl transition-all'
                  >
                    Cancel
                  </button>
                  <button 
                    type='submit'
                    className='flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all'
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile