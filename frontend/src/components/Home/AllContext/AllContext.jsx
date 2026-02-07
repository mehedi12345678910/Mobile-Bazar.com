
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Card from '../Card'
import Container from '../../Shared/Container'
import LoadingSpinner from '../../Shared/LoadingSpinner'

const AllContext = () => {
  const { data: allContext = [], isLoading } = useQuery({
    queryKey: ['allContext'],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/allContext`)
      return result.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
      <Container>
      {allContext && allContext.length > 0 ? (
        <div className='pt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8'>
          {allContext.map(mobile => (
            <Card key={mobile._id} mobile={mobile} />
          ))}
        </div>
      ) : null}
    </Container>
  )
}

export default AllContext
