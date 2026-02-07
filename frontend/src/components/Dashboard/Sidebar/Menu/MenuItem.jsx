import { NavLink } from "react-router";

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-3 my-2 transition-all duration-300 group rounded-xl ${
          isActive
            ? "bg-blue-50 text-blue-600 shadow-sm" // Active state
            : "text-slate-500 hover:bg-gray-50 hover:text-slate-900" // Inactive/Hover state
        }`
      }
    >
      {({ isActive }) => (
        <>
          {/* Active Indicator Bar (Left side) */}
          <div
            className={`absolute left-0 w-1.5 h-8 bg-blue-600 rounded-r-full transition-all duration-300 ${
              isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          />

          {/* Icon with scaling effect */}
          <Icon 
            className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
              isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-900"
            }`} 
          />

          {/* Label with better typography */}
          <span className={`mx-4 font-semibold text-sm tracking-wide transition-colors ${
            isActive ? "text-blue-700" : "text-slate-500 group-hover:text-slate-900"
          }`}>
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
};

export default MenuItem;