



import Container from "../Container";
import {
  AiOutlineMenu,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import { FaMobileAlt } from "react-icons/fa";
import { HiOutlineLogout, HiOutlineViewGrid } from "react-icons/hi";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect for dynamic styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "All Context", path: "/all-context" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <div className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "top-2 px-4" : "top-0"}`}>
      <div 
        className={`mx-auto max-w-[1440px] transition-all duration-500 
        ${scrolled 
          ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-2xl border border-white/40" 
          : "bg-white/50 backdrop-blur-md border-b border-neutral-100"}`}
      >
        <Container>
          <div className="flex flex-row items-center justify-between py-3">
            
            {/* 1. Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-200 group-hover:rotate-6 transition-all duration-300">
                <FaMobileAlt className="text-white text-xl" />
                <div className="absolute inset-0 rounded-xl bg-white/20 scale-0 group-hover:scale-110 transition-transform duration-300"></div>
              </div>

              <h1 className="text-2xl font-black tracking-tighter">
                <span className="bg-gradient-to-r from-emerald-600 to-lime-500 bg-clip-text text-transparent">
                  Mobile
                </span>
                <span className="text-slate-800">Bazar</span>
              </h1>
            </Link>

            {/* 2. Middle Section: Premium NavLinks */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    relative text-sm font-bold transition-all duration-300 hover:text-emerald-600
                    ${isActive ? "text-emerald-600" : "text-slate-500"}
                    group
                  `}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full active:w-full`}></span>
                </NavLink>
              ))}
            </div>

            {/* 3. Right Side: Actions & Menu */}
            <div className="flex items-center gap-3">
              
              {/* Shopping Cart with Animation */}
              <div className="group relative p-2.5 hover:bg-emerald-50 rounded-full cursor-pointer transition-all duration-300">
                <AiOutlineShoppingCart size={22} className="text-slate-600 group-hover:text-emerald-600" />
                <span className="absolute top-1 right-1 bg-emerald-600 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full ring-2 ring-white">
                  0
                </span>
              </div>

              {/* User Profile Trigger */}
              <div
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 pl-2 pr-1 py-1 rounded-full cursor-pointer transition-all duration-300 border
                ${isOpen ? "bg-slate-100 border-slate-200 shadow-inner" : "bg-white border-slate-200 hover:shadow-md"}`}
              >
                <AiOutlineMenu className="text-slate-600 ml-1" />
                <div className="relative h-8 w-8">
                  <img
                    className="rounded-full object-cover border border-emerald-100"
                    src={user?.photoURL ? user.photoURL : avatarImg}
                    alt="profile"
                  />
                  {user && <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 border-2 border-white rounded-full"></div>}
                </div>
              </div>

              {/* Advanced Dropdown Menu */}
              {isOpen && (
                <>
                  {/* Backdrop for closing */}
                  <div className="fixed inset-0 z-[-1]" onClick={() => setIsOpen(false)}></div>
                  
                  <div className="absolute right-0 top-[110%] w-64 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-200">
                    {user ? (
                      <div className="flex flex-col">
                        <div className="p-5 bg-gradient-to-br from-slate-50 to-white border-b border-slate-100">
                          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Authenticated</p>
                          <p className="text-sm font-bold text-slate-800 truncate">{user?.displayName}</p>
                          <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                        </div>
                        
                        <div className="p-2">
                          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition">
                            <HiOutlineViewGrid className="text-lg" /> Dashboard
                          </Link>
                          <button
                            onClick={logOut}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition mt-1"
                          >
                            <HiOutlineLogout className="text-lg" /> Sign Out
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 flex flex-col gap-2">
                        <Link to="/login" onClick={() => setIsOpen(false)} className="w-full py-3 text-center text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition">
                          Log In
                        </Link>
                        <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full py-3 text-center text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-100 transition">
                          Create Account
                        </Link>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;