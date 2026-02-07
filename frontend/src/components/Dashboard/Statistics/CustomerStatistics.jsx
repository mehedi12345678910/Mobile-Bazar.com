import { FaWallet, FaShoppingBag, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { Link } from 'react-router';

const CustomerStatistics = () => {
  return (
    <div className='container mx-auto px-4 sm:px-8 max-w-7xl py-12 bg-[#FAFBFC] min-h-screen'>
      
      {/* --- TOP HEADER SECTION --- */}
      <div className='flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4'>
        <div>
          <span className='text-blue-600 font-black text-xs uppercase tracking-[0.3em] bg-blue-50 px-3 py-1 rounded-md'>Analytics Dashboard</span>
          <h2 className='text-5xl font-black text-slate-900 tracking-tight mt-3'>Activity Overview</h2>
          <p className='text-slate-500 font-medium mt-2'>Analyze your spending, orders, and shopping performance.</p>
        </div>
        <div className='flex gap-3'>
          <Link to="/" className='px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-200 transition-all shadow-sm'>
            Export Data
          </Link>
          <Link to={'/dashboard/my-orders'} className='px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:shadow-xl hover:bg-black transition-all shadow-lg shadow-slate-200'>
            New Order
          </Link>
        </div>
      </div>

      {/* --- STATS BENTO GRID --- */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        
        {/* Large Main Stat Card */}
        <div className='md:col-span-2 bg-white p-10 rounded-[40px] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group'>
           <div className='relative z-10'>
              <p className='text-slate-400 font-black text-[10px] uppercase tracking-widest'>Total Investment / Spend</p>
              <h3 className='text-6xl font-black text-slate-900 mt-2 tracking-tighter'>$00.<span className='text-slate-300 text-4xl'>00</span></h3>
              <div className='flex items-center gap-2 mt-6 text-green-500 font-black text-sm'>
                <div className='p-1 bg-green-100 rounded-full'><FaArrowUp size={10} /></div>
                <span>+24.8% <span className='text-slate-400 font-medium'>vs last month</span></span>
              </div>
           </div>
           {/* Subtle Background Pattern */}
           <div className='absolute -bottom-10 -right-10 text-slate-50 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity'>
              <FaWallet size={250} />
           </div>
        </div>

        {/* Small Highlight Card */}
        <div className='bg-blue-600 p-10 rounded-[40px] text-white flex flex-col justify-between shadow-xl shadow-blue-100 relative overflow-hidden'>
           <div className='z-10'>
             <div className='w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6'>
                <FaShoppingBag size={20} />
             </div>
             <p className='text-blue-100 font-bold text-xs uppercase tracking-widest opacity-80'>Total Items</p>
             <h3 className='text-4xl font-black mt-1'>84 <span className='text-lg font-medium opacity-60'>Units</span></h3>
           </div>
           <div className='mt-8 z-10'>
              <div className='h-1.5 w-full bg-white/20 rounded-full overflow-hidden'>
                 <div className='h-full bg-white w-[70%]'></div>
              </div>
              <p className='text-[10px] mt-2 font-bold text-blue-100'>70% of monthly goal reached</p>
           </div>
        </div>

        {/* Third Row Info Cards */}
        <div className='bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6'>
           <div className='p-5 bg-amber-50 text-amber-500 rounded-3xl'>
              <HiOutlineLightBulb size={32} />
           </div>
           <div>
              <p className='text-slate-400 font-black text-[10px] uppercase tracking-widest'>Top Category</p>
              <h4 className='text-xl font-black text-slate-800'>Mobile Gadgets</h4>
           </div>
        </div>

        <div className='bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6'>
           <div className='p-5 bg-rose-50 text-rose-500 rounded-3xl'>
              <FaArrowDown size={32} />
           </div>
           <div>
              <p className='text-slate-400 font-black text-[10px] uppercase tracking-widest'>Refund Rate</p>
              <h4 className='text-xl font-black text-slate-800'>0.24%</h4>
           </div>
        </div>

        <div className='bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6'>
           <div className='p-5 bg-indigo-50 text-indigo-500 rounded-3xl'>
              <FaArrowUp size={32} />
           </div>
           <div>
              <p className='text-slate-400 font-black text-[10px] uppercase tracking-widest'>Loyalty Points</p>
              <h4 className='text-xl font-black text-slate-800'>2,450</h4>
           </div>
        </div>

      </div>

      {/* --- CHART PLACEHOLDER / TABLE --- */}
      <div className='mt-10 bg-slate-900 rounded-[40px] p-12 text-white relative overflow-hidden'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
            <div>
              <h4 className='text-2xl font-black italic tracking-tight'>Visual Growth Journey</h4>
              <p className='text-slate-400 text-sm mt-1 font-medium'>Your data is being processed for real-time visualization.</p>
            </div>
            <div className='flex -space-x-3'>
              {[1,2,3,4].map(i => (
                <div key={i} className='w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px] font-bold'>
                  U{i}
                </div>
              ))}
              <div className='w-10 h-10 rounded-full border-2 border-slate-900 bg-blue-600 flex items-center justify-center text-[10px] font-bold'>+12</div>
            </div>
          </div>
          
          {/* Dashboard illustration placeholder */}
          <div className='mt-12 h-48 w-full border border-dashed border-slate-700 rounded-3xl flex items-center justify-center'>
             <p className='text-slate-500 font-black uppercase tracking-widest text-xs animate-pulse'>Live Graph Rendering...</p>
          </div>
      </div>

    </div>
  )
}

export default CustomerStatistics;