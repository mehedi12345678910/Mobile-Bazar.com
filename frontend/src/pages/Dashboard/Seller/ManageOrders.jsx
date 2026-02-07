import SellerOrderDataRow from '../../../components/Dashboard/TableRows/SellerOrderDataRow'
import useAuth from '../../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import EmptyState from '../../../components/Shared/EmptyState'


const ManageOrders = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['orders', user?.email],
    enabled: !!user?.email, // User email na thakle query cholbe na
    queryFn: async () => {
      // .get() add kora bhalo clarity-r jonno
      const { data } = await axiosSecure.get(`/manage-orders/${user?.email}`)
      return data
    },
  })

  if (isLoading) return <LoadingSpinner />

  // Jodi kono order na thake
  if (orders.length === 0) return (
    <EmptyState 
      message="No orders have been placed yet!" 
      address="/dashboard" 
      label="Go to Statistics" 
    />
  )

  return (
    <div className='container mx-auto px-4 sm:px-8 bg-white min-h-screen'>
      <div className='py-8'>
        {/* Header Section */}
        <div className='mb-8'>
            <h2 className='text-3xl font-black text-slate-800 tracking-tight'>
                Manage <span className='text-emerald-500'>Orders</span>
            </h2>
            <p className='text-slate-500 font-medium'>Keep track of all customer purchases and fulfillment.</p>
        </div>

        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div className='inline-block min-w-full shadow-sm rounded-[2rem] border border-slate-100 overflow-hidden bg-white'>
            <table className='min-w-full leading-normal'>
              <thead>
                <tr className='bg-slate-50'>
                  <th className='px-6 py-5 border-b border-slate-100 text-left text-xs font-black text-slate-400 uppercase tracking-[2px]'>
                    Product
                  </th>
                  <th className='px-6 py-5 border-b border-slate-100 text-left text-xs font-black text-slate-400 uppercase tracking-[2px]'>
                    Customer
                  </th>
                  <th className='px-6 py-5 border-b border-slate-100 text-left text-xs font-black text-slate-400 uppercase tracking-[2px]'>
                    Price
                  </th>
                  <th className='px-6 py-5 border-b border-slate-100 text-left text-xs font-black text-slate-400 uppercase tracking-[2px]'>
                    Qty
                  </th>
                  <th className='px-6 py-5 border-b border-slate-100 text-left text-xs font-black text-slate-400 uppercase tracking-[2px]'>
                    Status
                  </th>
                  <th className='px-6 py-5 border-b border-slate-100 text-center text-xs font-black text-slate-400 uppercase tracking-[2px]'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-50'>
                {orders.map(order => (
                  <SellerOrderDataRow 
                    key={order._id} 
                    order={order} 
                    refetch={refetch} 
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageOrders