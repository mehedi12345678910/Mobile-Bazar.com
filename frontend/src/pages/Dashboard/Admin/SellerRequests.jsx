import { useQuery } from '@tanstack/react-query'
import SellerRequestsDataRow from '../../../components/Dashboard/TableRows/SellerRequestsDataRow'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'

const SellerRequests = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['seller-requests', user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/seller-requests`)
      return result.data
    },
  })
  

  if (isLoading) return <LoadingSpinner />

  return (
    <div className='container mx-auto px-4 sm:px-8 max-w-5xl'>
      <div className='py-10'>
        {/* Header Section */}
        <div className='mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div>
            <h2 className='text-3xl font-black text-slate-800 tracking-tight'>
              Seller Requests
            </h2>
            <p className='text-slate-500 text-sm mt-1 font-medium'>
              Review and approve pending applications for seller accounts.
            </p>
          </div>
          
          {/* Status Badge */}
          <div className='inline-flex items-center px-4 py-2 rounded-xl bg-amber-50 border border-amber-100'>
             <span className='w-2 h-2 rounded-full bg-amber-500 animate-pulse mr-2'></span>
             <span className='text-amber-800 text-sm font-bold'>
               Pending Requests: {requests.length}
             </span>
          </div>
        </div>

        {/* Table Container */}
        <div className='bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='min-w-full leading-normal'>
              <thead>
                <tr className='bg-slate-50/50'>
                  <th
                    scope='col'
                    className='px-8 py-5 text-slate-500 text-left text-[11px] uppercase font-black tracking-[0.15em] border-b border-slate-100'
                  >
                    Applicant Details
                  </th>
                  <th
                    scope='col'
                    className='px-8 py-5 text-slate-500 text-right text-[11px] uppercase font-black tracking-[0.15em] border-b border-slate-100'
                  >
                    Manage Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-50'>
                {requests.length > 0 ? (
                  requests.map(req => (
                    <SellerRequestsDataRow
                      refetch={refetch}
                      key={req._id}
                      req={req}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan='2' className='px-8 py-20 text-center'>
                      <div className='flex flex-col items-center justify-center'>
                        <div className='bg-slate-50 p-4 rounded-full mb-4'>
                           <svg className='w-8 h-8 text-slate-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                           </svg>
                        </div>
                        <p className='text-slate-400 font-bold text-lg'>All caught up!</p>
                        <p className='text-slate-400 text-sm'>No pending seller requests at the moment.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerRequests