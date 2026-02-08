import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'

const SellerRequestsDataRow = ({ req, refetch }) => {
  const axiosSecure = useAxiosSecure()

  // রোল আপডেট ফাংশন
  const handleRoleUpdate = async () => {
    try {
      await axiosSecure.patch('/update-role', {
        email: req?.email,
        role: 'seller',
      })
      toast.success('অভিনন্দন! ইউজার এখন সেলার।')
      refetch()
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.message || 'আপডেট করতে সমস্যা হয়েছে')
    }
  }

  // রিকোয়েস্ট ডিলিট ফাংশন
  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/seller-requests/${req._id}`)
      toast.success('রিকোয়েস্টটি সফলভাবে বাতিল করা হয়েছে।')
      refetch()
    } catch (err) {
      console.log(err)
      toast.error('মুছে ফেলতে সমস্যা হয়েছে 😥')
    }
  }

  return (
    <tr className="hover:bg-slate-50/50 transition-colors duration-200 border-b border-slate-100 last:border-0">
      {/* ইউজার প্রোফাইল ও ইমেইল */}
      <td className='px-6 py-4'>
        <div className='flex items-center gap-4'>
          <div className='h-11 w-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-sm'>
            {req?.email?.slice(0, 1).toUpperCase()}
          </div>
          <div>
            <p className='font-semibold text-slate-800 leading-none'>{req?.email}</p>
            <p className='text-[11px] mt-1 uppercase tracking-wider font-bold text-amber-500'>
               Pending Request
            </p>
          </div>
        </div>
      </td>

      {/* অ্যাকশন: সেলার বানানো */}
      <td className='px-6 py-4'>
        <button
          onClick={handleRoleUpdate}
          className='group relative flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg hover:bg-emerald-600 hover:text-white transition-all duration-300'
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 group-hover:bg-white animate-pulse"></span>
          Approve & Make Seller
        </button>
      </td>

      {/* অ্যাকশন: ডিলিট/রিজেক্ট */}
      <td className='px-6 py-4 text-right'>
        <button
          onClick={handleDelete}
          className='inline-flex items-center justify-center p-2 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 hover:text-rose-600 transition-all duration-200 group'
          title="Reject Request"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </td>
    </tr>
  )
}

export default SellerRequestsDataRow;