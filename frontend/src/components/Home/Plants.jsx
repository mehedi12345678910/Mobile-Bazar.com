// import Card from './Card'
// import Container from '../Shared/Container'
// import { useQuery } from '@tanstack/react-query'
// import axios from 'axios'
// import LoadingSpinner from '../Shared/LoadingSpinner'
// import Banner from './Banner'
// import { NavLink } from 'react-router'
// import { FaArrowRight } from 'react-icons/fa'

// const mobiles = () => {
//   const { data: mobiles = [], isLoading } = useQuery({
//     queryKey: ['mobiles'],
//     queryFn: async () => {
//       const result = await axios(`${import.meta.env.VITE_API_URL}/mobiles`)
//       return result.data
//     },
//   })

//   if (isLoading) return <LoadingSpinner />

//   return (
//     <Container>
//       <Banner/>
//       {mobiles && mobiles.length > 0 ? (
//         <div className='pt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8'>
//           {mobiles.map(mobile => (
//             <Card key={mobile._id} mobile={mobile} />
//           ))}
//         </div>
//       ) : null}
//       <div className='mt-3 justify-end'>
//         <NavLink className='btn btn-warning'>Next page <FaArrowRight /></NavLink>
       
//       </div>
//     </Container>
//   )
// }

// export default mobiles


import Card from './Card'
import Container from '../Shared/Container'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingSpinner from '../Shared/LoadingSpinner'
import Banner from './Banner'
import { NavLink } from 'react-router'
import { FaArrowRight, FaMobileAlt } from 'react-icons/fa'

const Mobiles = () => {
  const { data: mobiles = [], isLoading } = useQuery({
    queryKey: ['mobiles'],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/mobiles`)
      return data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <Container>
      <Banner />

      {/* Section Title - UI ke aro unique korbe */}
      <div className="flex items-center gap-3 pt-12 pb-6 border-b border-gray-100">
        <div className="p-2 bg-warning/10 rounded-lg text-warning">
          <FaMobileAlt size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Latest Collections</h2>
          <p className="text-sm text-gray-500">Explore our high-end smartphones</p>
        </div>
      </div>

      {mobiles.length > 0 ? (
        <>
          {/* Responsive Grid - Better spacing and alignment */}
          <div className='pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
            {mobiles.map(mobile => (
              <Card key={mobile._id} mobile={mobile} />
            ))}
          </div>

          {/* Pagination/Next Button Section */}
          <div className='mt-12 flex justify-center md:justify-end pb-10'>
            <NavLink 
              to="/all-context"
              className='btn btn-warning px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 group'
            >
              See More Devices 
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </NavLink>
          </div>
        </>
      ) : (
        /* Empty State - Jodi data na thake */
        <div className="py-20 text-center">
          <p className="text-xl text-gray-400">No mobiles found at the moment.</p>
        </div>
      )}
    </Container>
  )
}

export default Mobiles