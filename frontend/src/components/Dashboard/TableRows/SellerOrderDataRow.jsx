import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import { HiOutlineTrash } from 'react-icons/hi2'

const SellerOrderDataRow = ({ order, refetch }) => {
  const axiosSecure = useAxiosSecure()
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)

  const { _id, name, price, quantity, status, customer } = order || {}

  // Handle Status Change
  const handleStatusChange = async (newStatus) => {
    try {
      await axiosSecure.patch(`/order/status/${_id}`, { status: newStatus })
      toast.success(`Order is now ${newStatus}`)
      refetch() // Table data refresh hobe
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status")
    }
  }
 const handleDelete = async () => {
  try {
    await axiosSecure.delete(`/orders/${_id}`);
    toast.success('Order deleted successfully');
    refetch();
    closeModal();
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to delete order');
  }
}

  // Status Badge Colors
  const statusStyles = {
    pending: 'bg-orange-100 text-orange-600',
    'In Progress': 'bg-blue-100 text-blue-600',
    Delivered: 'bg-emerald-100 text-emerald-600',
    Cancelled: 'bg-red-100 text-red-600',
  }

  return (
    <tr className='hover:bg-slate-50/50 transition-colors group'>
      {/* Product Name */}
      <td className='px-6 py-5 text-sm border-b border-slate-50'>
        <p className='text-slate-800 font-bold'>{name}</p>
      </td>

      {/* Customer Info */}
      <td className='px-6 py-5 text-sm border-b border-slate-50'>
        <div className='flex flex-col'>
          <p className='text-slate-800 font-semibold'>{customer.name || 'Unknown'}</p>
          <p className='text-[11px] text-slate-400 font-medium'>{customer.email || customer}</p>
        </div>
      </td>

      {/* Price */}
      <td className='px-6 py-5 text-sm border-b border-slate-50'>
        <p className='text-slate-900 font-black'>${price}</p>
      </td>

      {/* Quantity */}
      <td className='px-6 py-5 text-sm border-b border-slate-50 text-center'>
        <span className='px-3 py-1 bg-slate-100 rounded-lg font-bold text-slate-600'>
            {quantity}
        </span>
      </td>

      {/* Status Badge */}
      <td className='px-6 py-5 text-sm border-b border-slate-50'>
        <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider ${statusStyles[status] || 'bg-slate-100 text-slate-600'}`}>
          {status}
        </span>
      </td>

      {/* Actions (Select & Delete) */}
      <td className='px-6 py-5 text-sm border-b border-slate-50 text-right'>
        <div className='flex items-center justify-end gap-3'>
          <select
            required
            defaultValue={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={status === 'Delivered'}
            className='cursor-pointer text-xs font-bold bg-white border-2 border-slate-100 px-3 py-2 rounded-xl focus:border-emerald-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <option value='pending'>pending</option>
            <option value='In Progress'>Processing</option>
            <option value='Delivered'>Deliver</option>
          </select>

          <button
            onClick={() => setIsOpen(true)}
            disabled={status === 'Delivered'}
            className='p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed'
            title="Cancel Order"
          >
            <HiOutlineTrash size={18} />
          </button>
        </div>

        <DeleteModal 
            isOpen={isOpen} 
            closeModal={closeModal} 
            handleDelete={() => console.log('Delete Order Logic Here')} 
        />
      </td>
    </tr>
  )
}

export default SellerOrderDataRow