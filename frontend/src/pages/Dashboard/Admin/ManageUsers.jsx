import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useAuth from '../../../hooks/useAuth'

const UserDataRow = ({ user, refetch }) => {
  const axiosSecure = useAxiosSecure()
  const { user: currentUser } = useAuth()

  // Role update mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (newRole) => {
      const { data } = await axiosSecure.patch(`/update-role`, {
        email: user?.email,
        role: newRole,
      })
      return { data, newRole } // newRole pass korchi success message er jonno
    },
    onSuccess: (responseData) => {
      refetch()
      toast.success(`${user?.name} is now an ${responseData.newRole}!`)
    },
    onError: (err) => {
      console.error(err)
      toast.error(err.response?.data?.message || 'Failed to update role')
    }
  })

  const handleRoleChange = async (e) => {
    const selectedRole = e.target.value
    
    // ১. একই রোল সিলেক্ট করলে কিছুই হবে না
    if (selectedRole === user?.role) return

    // ২. নিজে নিজের রোল চেঞ্জ করা যাবে না
    if (user?.email === currentUser?.email) {
      toast.error("You cannot change your own role!")
      return
    }

    // ৩. কনফার্মেশন (ঐচ্ছিক কিন্তু ভালো)
    const confirmed = window.confirm(`Change ${user?.name}'s role to ${selectedRole}?`)
    if (!confirmed) {
      e.target.value = user?.role // আগের রোলে ব্যাক করবে
      return
    }

    try {
      await mutateAsync(selectedRole)
    } catch (err) {
      // Error handled in mutation
    }
  }

  return (
    <tr className='hover:bg-slate-50/80 transition-all duration-200 group'>
      {/* User Info */}
      <td className='px-8 py-5 border-b border-slate-100'>
        <div className='flex items-center gap-4'>
          <div className='relative shrink-0'>
            <img 
              src={user?.image || 'https://i.ibb.co.com/Z1LXQWh0/08852dd4d87737fa305de7d9a573a236.webp'} 
              alt='user avatar' 
              className='h-11 w-11 rounded-xl object-cover ring-2 ring-slate-100 group-hover:ring-blue-100 transition-all shadow-sm'
            />
            {/* Status Indicator */}
            <span className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white shadow-sm ${
                user?.role === 'admin' ? 'bg-purple-500' : user?.role === 'seller' ? 'bg-blue-500' : 'bg-emerald-500'
            }`}></span>
          </div>
          <div className='flex flex-col'>
            <span className='text-slate-800 font-bold text-sm leading-tight'>{user?.name || 'Anonymous'} </span>
            <span className='text-slate-500 text-xs font-medium mt-0.5'>{user?.email} aisa@gmail.com</span>
          </div>
        </div>
      </td>
      
      {/* Current Role Badge */}
      <td className='px-8 py-5 border-b border-slate-100'>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
          user?.role === 'admin' 
            ? 'bg-purple-50 border-purple-100 text-purple-700' 
            : user?.role === 'seller' 
            ? 'bg-blue-50 border-blue-100 text-blue-700' 
            : 'bg-emerald-50 border-emerald-100 text-emerald-700'
        }`}>
          {user?.role}seller
        </span>
      </td>

      {/* Action Dropdown */}
      <td className='px-8 py-5 border-b border-slate-100 text-right'>
        <div className='flex justify-end'>
          <div className='relative'>
             <select
                defaultValue={user?.role}
                disabled={isPending || user?.email === currentUser?.email}
                onChange={handleRoleChange}
                className={`
                  appearance-none block w-36 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-4 py-2.5 
                  outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer shadow-sm
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                <option value='customer'>Customer</option>
                <option value='seller'>Seller</option>
                <option value='admin'>Admin</option>
              </select>
              {/* Custom Arrow for Select */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default UserDataRow