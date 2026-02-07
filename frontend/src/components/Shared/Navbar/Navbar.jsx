// import Container from "../Container";
// import {
//   AiOutlineMenu,
//   AiOutlineSearch,
//   AiOutlineShoppingCart,
// } from "react-icons/ai";
// import { useState } from "react";
// import { Link, NavLink } from "react-router";
// import useAuth from "../../../hooks/useAuth";
// import avatarImg from "../../../assets/images/placeholder.jpg";
// import { FaMobileAlt } from "react-icons/fa";


// const Navbar = () => {
//   const { user, logOut } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="fixed w-full bg-white/70 backdrop-blur-xl z-30 border-b-[1px] border-neutral-100 transition-all duration-300">
//       <div className="py-2.5">
//         <Container>
//           <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
//             {/* 1. Brand Logo */}
//            <Link to="/" className="flex items-center gap-2 group select-none">
//               <div className="p-2 rounded-xl bg-gradient-to-br from-lime-400 to-green-600 shadow-lg group-hover:scale-105 transition-transform duration-300">
//                 <FaMobileAlt className="text-white text-xl" />
//               </div>

//               <h1 className="text-2xl font-extrabold tracking-wide">
//                 <span className="bg-gradient-to-r from-lime-400 via-green-500 to-emerald-500 bg-clip-text text-transparent">
//                   Mobile
//                 </span>
//                 <span className="text-gray-800 text-green-500">Bazar</span>
//                 <span className="text-sm text-lime-500 ml-1">.com</span>
//               </h1>
//             </Link>

//             {/* 2. Middle Section: Search Bar (Unique Touch) */}
//             <div className="flex gap-6  pb-2">
//               <NavLink
//                 to="/"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
//                     : "text-gray-600 hover:text-blue-500"
//                 }
//               >
//                 Home
//               </NavLink>

//               <NavLink
//                 to="/all-context"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
//                     : "text-gray-600 hover:text-blue-500"
//                 }
//               >
//                 All Context
//               </NavLink>
//               <NavLink
//                 to="/dashboard"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
//                     : "text-gray-600 hover:text-blue-500"
//                 }
//               >
//                 Dashboard
//               </NavLink>
//             </div>

//             {/* 3. Right Side: Actions & Menu */}
//             <div className="relative flex items-center gap-2 md:gap-5">
//               {/* Dynamic Action Button */}
//               {!user && (
//                 <Link
//                   to="/login"
//                   className="hidden md:block text-sm font-bold text-neutral-700 hover:text-black transition"
//                 >
//                   Post an Ad
//                 </Link>
//               )}

//               {/* Shopping Cart (Iconic) */}
//               <div className="relative p-2 hover:bg-neutral-100 rounded-full cursor-pointer transition text-neutral-600">
//                 <AiOutlineShoppingCart size={22} />
//                 <span className="absolute top-1 right-1 bg-neutral-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
//                   0
//                 </span>
//               </div>

//               {/* User Dropdown Profile */}
//               <div
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="p-1.5 md:py-1.5 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-lg transition bg-white"
//               >
//                 <AiOutlineMenu className="ml-1 text-neutral-500" />
//                 <div className="hidden md:block">
//                   <img
//                     className="rounded-full border border-neutral-100 ring-2 ring-neutral-50"
//                     referrerPolicy="no-referrer"
//                     src={user && user.photoURL ? user.photoURL : avatarImg}
//                     alt="profile"
//                     height="32"
//                     width="32"
//                   />
//                 </div>
//               </div>

//               {/* Dropdown Content */}
//               {isOpen && (
//                 <div className="absolute rounded-2xl shadow-2xl w-[60vw] md:w-[18vw] bg-white border border-neutral-100 overflow-hidden right-0 top-14 text-sm transition-all duration-300 transform origin-top-right">
//                   <div className="flex flex-col">
//                     {user ? (
//                       <>
//                         <div className="px-5 py-4 bg-neutral-50/50 border-b border-neutral-100">
//                           <p className="text-xs text-neutral-400 font-bold uppercase">
//                             Welcome back,
//                           </p>
//                           <p className="text-sm font-black text-neutral-800 truncate">
//                             {user?.displayName}
//                           </p>
//                         </div>
//                         <Link
//                           to="/dashboard"
//                           className="px-5 py-3.5 hover:bg-neutral-50 transition font-semibold text-neutral-600 hover:text-neutral-900"
//                         >
//                           My Dashboard
//                         </Link>
//                         <Link
//                           to="/dashboard/my-inventory"
//                           className="px-5 py-3.5 hover:bg-neutral-50 transition font-semibold text-neutral-600 hover:text-neutral-900"
//                         >
//                           My Inventory
//                         </Link>
//                         <div
//                           onClick={logOut}
//                           className="px-5 py-4 hover:bg-red-50 text-red-500 transition font-bold cursor-pointer border-t border-neutral-100"
//                         >
//                           Sign Out
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         <Link
//                           to="/login"
//                           className="px-5 py-4 hover:bg-neutral-50 transition font-bold text-neutral-700"
//                         >
//                           Log In
//                         </Link>
//                         <div className="p-3">
//                           <Link
//                             to="/signup"
//                             className="block px-5 py-3 bg-neutral-900 text-white hover:bg-neutral-800 transition font-bold text-center rounded-xl"
//                           >
//                             Create Account
//                           </Link>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </Container>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



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