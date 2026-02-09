import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router"; // router-dom ব্যবহার করাই স্ট্যান্ডার্ড
import { AiOutlineMenu, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { FaMobileAlt, FaUserCircle } from "react-icons/fa";
import { HiOutlineLogout, HiOutlineViewGrid } from "react-icons/hi";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import Container from "../Container";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    { name: "All Products", path: "/all-context" }, // নাম পরিবর্তন করে products দিলাম
    { name: "Dashboard", path: "/dashboard" },
  ];

  const activeClassName = "relative text-emerald-600 font-bold transition-all duration-300";
  const inactiveClassName = "relative text-slate-500 font-medium hover:text-emerald-500 transition-all duration-300";

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "top-0 md:top-2 md:px-4" : "top-0"}`}>
      <div 
        className={`mx-auto max-w-[1440px] transition-all duration-500 
        ${scrolled 
          ? "bg-white/90 backdrop-blur-xl shadow-lg md:rounded-2xl border-b md:border border-slate-200/50" 
          : "bg-white border-b border-slate-100"}`}
      >
        <Container>
          <div className="flex flex-row items-center justify-between py-3 md:py-4">
            
            {/* 1. Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition"
            >
              <AiOutlineMenu size={24} className="text-slate-700" />
            </button>

            {/* 2. Brand Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 shadow-md group-hover:scale-110 transition-transform duration-300">
                <FaMobileAlt className="text-white text-lg" />
              </div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-emerald-600 to-lime-600 bg-clip-text text-transparent">Mobile</span>
                <span className="text-slate-800">Bazar</span>
              </h1>
            </Link>

            {/* 3. Desktop NavLinks */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => (isActive ? activeClassName : inactiveClassName)}
                >
                  {({ isActive }) => (
                    <>
                      {item.name}
                      <span className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-500 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* 4. Right Side Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Cart */}
              <div className="relative p-2.5 hover:bg-emerald-50 rounded-full cursor-pointer transition-colors group">
                <AiOutlineShoppingCart size={22} className="text-slate-600 group-hover:text-emerald-600" />
                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full ring-2 ring-white">
                  0
                </span>
              </div>

              {/* User Dropdown (Desktop) */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 p-1 pr-3 border border-slate-200 rounded-full hover:shadow-md transition bg-white"
                >
                  <img
                    className="h-8 w-8 rounded-full border border-emerald-100"
                    src={user?.photoURL || avatarImg}
                    alt="profile"
                  />
                  <AiOutlineMenu size={16} className="text-slate-500" />
                </button>

                {isOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-2xl border border-slate-100 z-20 overflow-hidden py-2 animate-in fade-in slide-in-from-top-5">
                      {user ? (
                        <>
                          <div className="px-4 py-3 border-b border-slate-50 mb-2">
                            <p className="text-sm font-bold text-slate-800">{user.displayName}</p>
                            <p className="text-xs text-slate-400 truncate">{user.email}</p>
                          </div>
                          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition">
                            <HiOutlineViewGrid size={18} /> Dashboard
                          </Link>
                          <button onClick={logOut} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-500 hover:bg-rose-50 transition">
                            <HiOutlineLogout size={18} /> Sign Out
                          </button>
                        </>
                      ) : (
                        <div className="p-2 space-y-1">
                          <Link to="/login" className="block px-4 py-2 text-sm text-center font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Log In</Link>
                          <Link to="/signup" className="block px-4 py-2 text-sm text-center font-bold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow-md">Sign Up</Link>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* --- Mobile Sidebar Overlay --- */}
      <div className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsMobileMenuOpen(false)}>
        <div 
          className={`fixed left-0 top-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-out p-6 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-emerald-600">Menu</h2>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
              <AiOutlineClose size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {navItems.map((item) => (
              <NavLink 
                key={item.path} 
                to={item.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `block text-lg font-semibold ${isActive ? "text-emerald-600" : "text-slate-600"}`}
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="absolute bottom-8 left-6 right-6 border-t pt-6">
            {user ? (
              <div className="flex items-center gap-3 mb-6">
                <img className="h-10 w-10 rounded-full" src={user?.photoURL || avatarImg} alt="user" />
                <div className="overflow-hidden">
                  <p className="font-bold text-slate-800 truncate">{user.displayName}</p>
                  <button onClick={logOut} className="text-sm text-rose-500 font-medium">Logout</button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block w-full py-3 text-center font-bold text-slate-700 border border-slate-200 rounded-xl">Login</Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="block w-full py-3 text-center font-bold bg-emerald-600 text-white rounded-xl">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;