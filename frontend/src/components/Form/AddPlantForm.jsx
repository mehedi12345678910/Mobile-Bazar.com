import { useForm } from 'react-hook-form'
import { imageUpload } from '../../utils'
import useAuth from '../../hooks/useAuth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import LoadingSpinner from '../Shared/LoadingSpinner'
import ErrorPage from '../../pages/ErrorPage'
import toast from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useNavigate } from 'react-router'

const AddPlantForm = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    mutateAsync,
    isPending,
    isError,
  } = useMutation({
    // Backend endpoint 'mobiles' nishchit korun jodi mobile shop hoy
    mutationFn: async payload => await axiosSecure.post(`/mobiles`, payload),
    onSuccess: () => {
      toast.success('Product added to inventory!')
      // Inventory list refresh korar jonno
      queryClient.invalidateQueries(['my-inventory'])
      navigate('/dashboard/my-inventory')
    },
    onError: error => {
      toast.error(error.message)
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async data => {
    const { name, description, quantity, price, category, image } = data
    const imageFile = image[0]

    try {
      // 1. Image Upload to IMGBB or other
      const imageUrl = await imageUpload(imageFile)
      
      // 2. Data object banano (Backend schema onujayi)
      const mobileData = {
        image: imageUrl,
        name,
        description,
        quantity: Number(quantity),
        price: Number(price),
        category,
        seller: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
      }
      
      // 3. Mutation call
      await mutateAsync(mobileData)
      reset()
    } catch (err) {
      console.error(err)
      toast.error('Failed to upload image or save data')
    }
  }

  if (isError) return <ErrorPage />

  return (
    <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-white p-5 md:p-10 shadow-sm border border-gray-100'>
      <div className='w-full max-w-4xl'>
        <h2 className='text-2xl font-bold mb-6 text-gray-700'>Add New Product</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Left Side */}
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-600 mb-1'>Product Name</label>
                <input
                  className='w-full px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-lime-500 focus:border-transparent rounded-lg outline-none transition-all'
                  type='text'
                  placeholder='iPhone 15 Pro...'
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <p className='text-xs text-red-500 mt-1'>{errors.name.message}</p>}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-600 mb-1'>Category</label>
                <select
                  className='w-full px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-lime-500 rounded-lg outline-none'
                  {...register('category', { required: true })}
                >
                  <option value='Smartphone'>Smartphone</option>
                  <option value='Tablet'>Tablet</option>
                  <option value='Accessories'>Accessories</option>
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-600 mb-1'>Description</label>
                <textarea
                  className='w-full px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-lime-500 rounded-lg outline-none h-32'
                  placeholder='Product details...'
                  {...register('description', { required: 'Description is required' })}
                ></textarea>
              </div>
            </div>

            {/* Right Side */}
            <div className='space-y-4'>
              <div className='flex gap-4'>
                <div className='flex-1'>
                  <label className='block text-sm font-medium text-gray-600 mb-1'>Price ($)</label>
                  <input
                    className='w-full px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-lime-500 rounded-lg outline-none'
                    type='number'
                    {...register('price', { required: true, min: 1 })}
                  />
                </div>
                <div className='flex-1'>
                  <label className='block text-sm font-medium text-gray-600 mb-1'>Quantity</label>
                  <input
                    className='w-full px-4 py-2.5 border border-gray-200 focus:ring-2 focus:ring-lime-500 rounded-lg outline-none'
                    type='number'
                    {...register('quantity', { required: true, min: 1 })}
                  />
                </div>
              </div>

              {/* Custom Image Upload UI */}
              <div className='mt-2'>
                <label className='block text-sm font-medium text-gray-600 mb-2'>Product Image</label>
                <div className='border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-lime-500 transition-colors'>
                  <input
                    type='file'
                    id='image'
                    className='hidden'
                    {...register('image', { required: 'Image is required' })}
                  />
                  <label htmlFor='image' className='cursor-pointer'>
                    <div className='bg-lime-50 text-lime-600 font-bold py-2 px-4 rounded-lg inline-block'>
                      Select Image
                    </div>
                  </label>
                  {errors.image && <p className='text-xs text-red-500 mt-2'>{errors.image.message}</p>}
                </div>
              </div>

              <button
                type='submit'
                disabled={isPending}
                className='w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-black transition-all flex items-center justify-center'
              >
                {isPending ? <TbFidgetSpinner className='animate-spin' size={24} /> : 'Add Product'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPlantForm