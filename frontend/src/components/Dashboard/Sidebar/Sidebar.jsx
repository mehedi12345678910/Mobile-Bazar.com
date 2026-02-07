import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import useAuth from '../../../hooks/useAuth'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp, BsFillPersonBadgeFill } from 'react-icons/bs'
import { FaMobileAlt, FaTimes } from 'react-icons/fa'

import MenuItem from './Menu/MenuItem'
import AdminMenu from './Menu/AdminMenu'
import SellerMenu from './Menu/SellerMenu'
import CustomerMenu from './Menu/CustomerMenu'
import useRole from '../../../hooks/useRole'
import LoadingSpinner from '../../Shared/LoadingSpinner'

const Sidebar = () => {
  const { logOut, user } = useAuth()
  const [isActive, setActive] = useState(false)
  const [role, isRoleLoading] = useRole()
  const navigate = useNavigate()

  const handleToggle = () => setActive(!isActive)

  if (isRoleLoading) return <LoadingSpinner />

  return (
    <>
      {/* Mobile Top Navbar */}
      <div className='bg-white/80 backdrop-blur-md border-b border-slate-100 text-slate-800 flex justify-between md:hidden sticky top-0 z-50 px-4 py-3'>
        <Link to="/" className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-500 shadow-lg shadow-emerald-100">
            <FaMobileAlt className="text-white text-lg" />
          </div>
          <span className="font-black text-xl tracking-tighter text-slate-800">MobileBazar</span>
        </Link>
        <button onClick={handleToggle} className='p-2 rounded-xl bg-slate-50 text-slate-600 active:scale-95 transition-all'>
          {isActive ? <FaTimes size={20} /> : <AiOutlineBars size={20} />}
        </button>
      </div>

      {/* Sidebar Container */}
      <div
        className={`z-50 md:fixed flex flex-col justify-between overflow-x-hidden bg-white w-72 space-y-6 px-4 py-6 absolute inset-y-0 left-0 transform border-r border-slate-100 shadow-2xl md:shadow-none
        ${isActive ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)`}
      >
        <div className='flex flex-col h-full'>
          
          {/* 1. Brand Logo Area */}
          <div className='px-2 mb-10 hidden md:block'>
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative p-3 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-xl group-hover:rotate-[10deg] transition-all duration-300">
                <FaMobileAlt className="text-white text-2xl" />
              </div>
              <div className='flex flex-col'>
                <h1 className="text-xl font-black tracking-tight text-slate-900 leading-none">
                  Mobile<span className='text-emerald-500'>Bazar</span>
                </h1>
                <span className='text-[10px] font-bold text-slate-400 uppercase tracking-[2px] mt-1'>Control Panel</span>
              </div>
            </Link>
          </div>

          {/* 2. Navigation Section */}
          <div className='flex-1'>
            <p className='text-[11px] font-black text-slate-400 uppercase tracking-[2px] mb-4 px-4'>Main Menu</p>
            <nav className='space-y-1'>
              <MenuItem
                icon={BsGraphUp}
                label='Statistics'
                address='/dashboard'
              />
              
              {/* Dynamic Roles with separator vibe */}
              <div className='mt-6 pt-6 border-t border-slate-50'>
                {role === 'customer' && <CustomerMenu />}
                {role === 'seller' && <SellerMenu />}
                {role === 'admin' && <AdminMenu />}
              </div>
            </nav>
          </div>

          {/* 3. Footer / User Profile Area */}
          <div className='mt-auto pt-6 border-t border-slate-100'>
            {/* Profile Info Card */}
            <div className='flex items-center gap-3 p-3 mb-4 bg-slate-50 rounded-2xl'>
                <img 
                    src={user?.photoURL || 'https://i.ibb.co/bc9996r/user.png'} 
                    className='w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm'
                    alt="profile" 
                />
                <div className='flex flex-col overflow-hidden'>
                    <p className='text-sm font-bold text-slate-800 truncate'>{user?.displayName || 'User'}</p>
                    <p className='text-[10px] font-black text-emerald-600 uppercase'>{role}</p>
                </div>
            </div>

            <nav className='space-y-1'>
                <MenuItem
                  icon={FcSettings}
                  label='Profile Settings'
                  address='/dashboard/profile'
                />
                <button
                  onClick={logOut}
                  className='group flex w-full items-center px-4 py-3 mt-2 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-2xl transition-all duration-300 font-bold text-sm'
                >
                  <GrLogout className='w-5 h-5 group-hover:-translate-x-1 transition-transform' />
                  <span className='mx-4'>Logout Account</span>
                </button>
            </nav>
          </div>

        </div>
      </div>

      {/* Overlay for mobile */}
      {isActive && (
        <div 
          onClick={handleToggle} 
          className='fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] z-40 md:hidden transition-opacity'
        ></div>
      )}
    </>
  )
}

export default Sidebar