import { useQuery } from '@tanstack/react-query'
import PlantDataRow from '../../../components/Dashboard/TableRows/PlantDataRow'
import useAuth from '../../../hooks/useAuth'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const MyInventory = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: mobiles = [], isLoading, refetch } = useQuery({
    queryKey: ['inventory', user?.email],
    enabled: !!user?.email, // User email thaklei query cholbe
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-inventory/${user?.email}`)
      return data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <div className='py-8'>
        <h2 className='text-2xl font-semibold leading-tight mb-4'>My Inventory</h2>
        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div className='inline-block min-w-full shadow rounded-lg overflow-hidden border border-gray-200'>
            <table className='min-w-full leading-normal'>
              <thead>
                <tr className='bg-gray-100'>
                  {['Image', 'Name', 'Category', 'Price', 'Quantity', 'Delete', 'Update'].map((head) => (
                    <th key={head} className='px-5 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold'>
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mobiles.length > 0 ? (
                  mobiles.map(mobile => (
                    <PlantDataRow 
                      key={mobile._id} 
                      mobile={mobile} 
                      refetch={refetch} // Delete ba Update er por refetch korar jonno
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan='7' className='text-center py-10 text-gray-500'>
                      No products found in your inventory.
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

export default MyInventory