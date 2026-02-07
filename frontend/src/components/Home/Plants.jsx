import Card from './Card'
import Container from '../Shared/Container'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingSpinner from '../Shared/LoadingSpinner'
import Banner from './Banner'

const mobiles = () => {
  const { data: mobiles = [], isLoading } = useQuery({
    queryKey: ['mobiles'],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/mobiles`)
      return result.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <Container>
      <Banner/>
      {mobiles && mobiles.length > 0 ? (
        <div className='pt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8'>
          {mobiles.map(mobile => (
            <Card key={mobile._id} mobile={mobile} />
          ))}
        </div>
      ) : null}
    </Container>
  )
}

export default mobiles
