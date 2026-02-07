import Button from '../components/Shared/Button/Button'
import { useNavigate } from 'react-router'
import { HiOutlineArrowNarrowLeft, HiOutlineHome } from 'react-icons/hi'

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <section className='relative bg-white overflow-hidden'>
      {/* Background Decorative Elements */}
      <div className='absolute top-0 left-0 w-full h-full'>
        <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-lime-100 rounded-full blur-[120px] opacity-50'></div>
        <div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-50'></div>
      </div>

      <div className='container relative flex items-center min-h-screen px-6 py-12 mx-auto'>
        <div className='flex flex-col items-center max-w-2xl mx-auto text-center'>
          
          {/* High Quality Icon with Animation */}
          <div className='relative mb-8'>
            <div className='absolute inset-0 bg-lime-400 rounded-full blur-3xl opacity-20 animate-pulse'></div>
            <div className='relative bg-white p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100'>
              <svg
                className='w-20 h-20 text-lime-500 animate-bounce'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
                  d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
          </div>

          {/* Big Gradient 404 Text */}
          <h1 className='text-[120px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-gray-700 to-lime-500 md:text-[180px]'>
            404
          </h1>
          
          <h2 className='mt-[-20px] text-3xl font-bold text-gray-800 md:text-4xl'>
            Oops! Lost in Space?
          </h2>
          
          <p className='mt-6 text-lg text-gray-500 max-w-md leading-relaxed'>
            আমরা দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি খুঁজে পাওয়া যাচ্ছে না। নিচের বাটনগুলো ব্যবহার করে ফিরে যেতে পারেন।
          </p>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row items-center w-full mt-10 gap-5 shrink-0 sm:w-auto'>
            
            {/* Go Back Button */}
            <button
              onClick={() => navigate(-1)}
              className='group flex items-center justify-center w-full px-8 py-3.5 text-sm font-bold text-gray-700 transition-all duration-300 bg-white border-2 border-gray-100 rounded-2xl gap-x-3 sm:w-auto hover:bg-gray-50 hover:border-lime-200 hover:shadow-xl active:scale-95'
            >
              <HiOutlineArrowNarrowLeft className='w-6 h-6 text-lime-500 group-hover:-translate-x-1 transition-transform' />
              <span>পিছনে যান</span>
            </button>

            {/* Home Button Container */}
            <div className='w-full sm:w-auto transform transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-lime-200 rounded-2xl'>
                <Button 
                    label={'হোম পেজে যান'} 
                    onClick={() => navigate('/')} 
                />
            </div>
          </div>

          {/* Bottom Support Info */}
          <div className='mt-16 pt-8 border-t border-gray-100 w-full flex flex-col sm:flex-row justify-center gap-8 text-sm text-gray-400'>
             <div className='flex items-center gap-2 cursor-pointer hover:text-lime-600 transition-colors'>
                <span className='w-2 h-2 bg-lime-400 rounded-full'></span>
                Support Center
             </div>
             <div className='flex items-center gap-2 cursor-pointer hover:text-lime-600 transition-colors'>
                <span className='w-2 h-2 bg-blue-400 rounded-full'></span>
                Report a Bug
             </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ErrorPage