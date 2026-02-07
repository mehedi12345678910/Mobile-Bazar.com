import React from 'react';
import { FaUserAlt, FaDollarSign, FaMobileAlt, FaShoppingCart } from 'react-icons/fa';
import { Calendar } from 'react-date-range';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';

// Mock Data for Chart
const data = [
  { name: 'Sun', sales: 4000 },
  { name: 'Mon', sales: 3000 },
  { name: 'Tue', sales: 5000 },
  { name: 'Wed', sales: 2780 },
  { name: 'Thu', sales: 1890 },
  { name: 'Fri', sales: 2390 },
  { name: 'Sat', sales: 3490 },
];

const StatCard = ({ title, value, icon: Icon, colorClass, shadowClass }) => (
  <div className='group relative flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl'>
    <div className={`absolute -top-5 left-6 p-4 rounded-2xl shadow-lg transition-transform group-hover:scale-110 ${colorClass} ${shadowClass} text-white`}>
      <Icon className='w-6 h-6' />
    </div>

    <div className='text-right pt-4'>
      <p className='text-xs font-bold text-gray-400 uppercase tracking-widest'>{title}</p>
      <h4 className='text-3xl font-black text-gray-800 mt-1'>{value}</h4>
    </div>

    <div className='mt-6 flex items-center gap-2'>
      <span className='flex items-center justify-center w-6 h-6 rounded-full bg-green-50 text-green-500 text-[10px] font-bold'>
        ↑
      </span>
      <p className='text-xs text-gray-500'>
        <span className='text-green-500 font-bold'>+5.2%</span> than last week
      </p>
    </div>
  </div>
);

const AdminStatistics = () => {
  return (
    <div className='min-h-screen bg-[#F8FAFB] px-4 py-8 lg:p-12 font-sans'>
      <div className='max-w-7xl mx-auto'>

        {/* Header Section */}
        <div className='flex flex-col md:flex-row justify-between items-center mb-12 gap-4'>
          <div className='text-center md:text-left'>
            <h2 className='text-3xl font-black text-gray-900 tracking-tight'>
              Admin <span className='text-blue-600'>Command Center</span>
            </h2>
            <p className='text-gray-500 font-medium mt-1'>
              Real-time insights for your mobile empire.
            </p>
          </div>
          <button className='bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-bold shadow-sm hover:bg-gray-50 transition-all'>
            Download Report
          </button>
        </div>

        {/* Stat Cards Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
          <StatCard title="Revenue" value="$24,500" icon={FaDollarSign}
            colorClass="bg-gradient-to-br from-blue-600 to-indigo-700" shadowClass="shadow-blue-200" />

          <StatCard title="Orders" value="382" icon={FaShoppingCart}
            colorClass="bg-gradient-to-br from-emerald-500 to-teal-600" shadowClass="shadow-emerald-200" />

          <StatCard title="Inventory" value="1,204" icon={FaMobileAlt}
            colorClass="bg-gradient-to-br from-orange-400 to-red-500" shadowClass="shadow-orange-200" />

          <StatCard title="New Users" value="89" icon={FaUserAlt}
            colorClass="bg-gradient-to-br from-purple-600 to-pink-600" shadowClass="shadow-purple-200" />
        </div>

        {/* Main Analytics Content */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>

          {/* Real Chart Component */}
          <div className='lg:col-span-2 bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8'>
            <div className='flex justify-between items-center mb-8'>
              <h3 className='font-black text-gray-800 text-xl tracking-tight'>Sales Momentum</h3>
              <div className='flex gap-2'>
                <span className='flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full italic'>Live Update</span>
              </div>
            </div>

            <div className='h-[300px] w-full'>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Calendar Section */}
          <div className='bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 flex flex-col items-center'>
            <h3 className='font-black text-gray-800 text-xl self-start mb-6 tracking-tight'>
              Deadlines
            </h3>
            <div className='w-full overflow-hidden rounded-2xl border border-gray-50 shadow-inner p-2 bg-gray-50/50'>
              <Calendar
                date={new Date()}
                onChange={(d) => console.log(d)}
                color="#3b82f6"
                className="w-full"
              />
            </div>
            <div className='mt-6 w-full'>
                <div className='flex items-center gap-4 p-3 bg-blue-50 rounded-xl'>
                    <div className='w-2 h-2 bg-blue-600 rounded-full animate-ping'></div>
                    <p className='text-sm font-bold text-blue-700 font-sans'>Meeting at 4:00 PM</p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;