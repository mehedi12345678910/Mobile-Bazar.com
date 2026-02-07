const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-screen'}
      flex 
      flex-col 
      justify-center 
      items-center 
      bg-white/10 backdrop-blur-sm`} // Subtle premium background
    >
      <div className="relative flex items-center justify-center">
        {/* Outer Ring Animation */}
        <div className="absolute w-20 h-20 border-4 border-slate-100 rounded-full"></div>
        
        {/* Spinning Gradient Ring */}
        <div className="absolute w-20 h-20 border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>

        {/* Center Pulsing Logo/Icon - Mobile Shape */}
        <div className="bg-slate-900 p-3 rounded-2xl shadow-xl animate-bounce">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" 
            />
          </svg>
        </div>
      </div>

      {/* Loading Text with Typewriter Effect Style */}
      <div className="mt-8 flex flex-col items-center">
        <p className="text-sm font-black text-slate-900 uppercase tracking-[0.3em] animate-pulse">
          Loading Quality
        </p>
        <div className="h-1 w-12 bg-blue-600 rounded-full mt-2 animate-infinite-scroll"></div>
      </div>

      {/* Custom Tailwind CSS Animation Inline */}
      <style jsx>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(-20px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(20px); opacity: 0; }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 1.5s infinite linear;
        }
      `}</style>
    </div>
  )
}

export default LoadingSpinner