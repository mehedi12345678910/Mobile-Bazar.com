import { useQuery } from '@tanstack/react-query'
import CustomerOrderDataRow from '../../../components/Dashboard/TableRows/CustomerOrderDataRow'
import useAuth from '../../../hooks/useAuth'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { HiOutlineShoppingBag, HiOutlineCube } from 'react-icons/hi'
import { BiFilterAlt, BiSearchAlt2 } from 'react-icons/bi'
import { RiHistoryFill } from 'react-icons/ri'

const MyOrders = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/my-orders`)
      return result.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div className='min-h-screen bg-[#FDFDFD] py-10 px-4 sm:px-6 lg:px-12'>
      <div className='max-w-7xl mx-auto'>
        
        {/* --- Header Section --- */}
        <div className='flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12'>
          <div className='space-y-2'>
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-2'>
              <RiHistoryFill size={14} />
              Activity Log
            </div>
            <h1 className='text-4xl sm:text-5xl font-black text-slate-900 tracking-tight'>
              Purchase <span className='text-blue-600 italic'>Vault</span>
            </h1>
            <p className='text-slate-500 font-medium text-base'>
              Manage your orders and monitor delivery status in real-time.
            </p>
          </div>

          <div className='flex flex-wrap items-center gap-4'>
             {/* Search/Filter Bar */}
            <div className='relative hidden md:block'>
                <BiSearchAlt2 className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400' size={20} />
                <input 
                    type="text" 
                    placeholder="Search orders..." 
                    className='pl-11 pr-6 py-3.5 bg-white border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-100 outline-none w-64 transition-all'
                />
            </div>
            
            <button className='flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-100 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm'>
              <BiFilterAlt size={20} />
              <span>Filter</span>
            </button>
            
            <div className='px-6 py-3.5 bg-slate-900 text-white rounded-2xl font-bold shadow-xl flex items-center gap-3'>
              <HiOutlineCube size={22} className='text-blue-400' />
              <span className='border-l border-slate-700 pl-3'>{orders.length} Items</span>
            </div>
          </div>
        </div>

        {/* --- Table Section --- */}
        <div className='bg-white rounded-[40px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)] border border-slate-50 overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='min-w-full border-separate border-spacing-0'>
              <thead>
                <tr className='bg-slate-50/50'>
                  {[
                    'Product Info', 
                    'Category', 
                    'Amount', 
                    'Quantity', 
                    'Status', 
                    'Operations'
                  ].map((item) => (
                    <th key={item} className='px-8 py-6 text-left text-xs font-black uppercase tracking-[0.15em] text-slate-400 border-b border-slate-50'>
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-50'>
                {orders.length > 0 ? (
                  orders.map(order => (
                    <CustomerOrderDataRow key={order._id} order={order} />
                  ))
                ) : (
                  <tr>
                    <td colSpan='6' className='py-32 text-center'>
                       <div className='flex flex-col items-center justify-center'>
                          <div className='w-32 h-32 bg-gradient-to-tr from-slate-50 to-white rounded-full flex items-center justify-center mb-6 shadow-inner'>
                             <HiOutlineShoppingBag size={50} className='text-slate-200' />
                          </div>
                          <h3 className='text-3xl font-black text-slate-800 tracking-tight'>Archive is Empty</h3>
                          <p className='text-slate-400 mt-3 max-w-sm mx-auto leading-relaxed font-medium'>
                            Looks like you haven't made any purchases yet. Your next favorite tech item is just a click away!
                          </p>
                          <button className='mt-10 px-12 py-5 bg-blue-600 text-white font-black rounded-[20px] hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 active:scale-95'>
                             Explore Products
                          </button>
                       </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Trust Footer --- */}
        <div className='mt-12 flex flex-col items-center gap-4'>
             <div className='h-px w-20 bg-slate-200'></div>
             <p className='text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]'>
                End-to-End Encrypted Data • PlantNet Security 2.0
             </p>
        </div>
      </div>
    </div>
  )
}

export default MyOrders