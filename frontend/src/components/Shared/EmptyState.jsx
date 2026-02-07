import Button from '../../components/Shared/Button/Button'
import { Link } from 'react-router'
import { HiOutlineInbox } from 'react-icons/hi2'

const EmptyState = ({ message, address, label }) => {
  return (
    <div className='min-h-[70vh] flex flex-col items-center justify-center p-6 text-center animate-fadeIn'>
      
      {/* Visual Element */}
      <div className='relative mb-8'>
        {/* Decorative Background Circles */}
        <div className='absolute inset-0 bg-slate-100 rounded-full scale-[2.5] opacity-50 animate-pulse'></div>
        <div className='relative bg-white p-8 rounded-full shadow-2xl border border-slate-50'>
          <HiOutlineInbox className='w-20 h-20 text-slate-300' />
        </div>
        
        {/* Floating Particles (Optional CSS Animation) */}
        <div className='absolute -top-2 -right-2 w-4 h-4 bg-lime-400 rounded-full animate-bounce'></div>
        <div className='absolute -bottom-4 -left-4 w-3 h-3 bg-blue-400 rounded-full animate-ping'></div>
      </div>

      {/* Text Content */}
      <div className='max-w-md'>
        <h2 className='text-3xl font-black text-slate-800 tracking-tight mb-3'>
          Nothing Here Yet!
        </h2>
        <p className='text-slate-500 font-medium mb-10 leading-relaxed'>
          {message || "It seems there's no data to show right now. Let's get started by adding something new."}
        </p>
      </div>

      {/* Action Button */}
      <Link 
        to={address} 
        className='transform transition-all hover:scale-105 active:scale-95'
      >
        <Button 
          label={label || "Go Back"} 
          className='px-10 py-4 shadow-xl shadow-lime-200'
        />
      </Link>

      {/* Helpful Tip */}
      <p className='mt-8 text-[10px] text-slate-300 font-bold uppercase tracking-[3px]'>
        Quick Tip: Check your filters or try refreshing
      </p>
    </div>
  )
}

export default EmptyState