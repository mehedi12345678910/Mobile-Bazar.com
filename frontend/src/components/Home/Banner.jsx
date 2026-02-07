import React from 'react'
import { FaArrowRight, FaShieldAlt, FaStar, FaTruck } from 'react-icons/fa'
import { Link } from 'react-router';

const Banner = () => {
  return (
    <div className="relative overflow-hidden bg-[#0a0a0a] min-h-[90vh] lg:min-h-[85vh] flex items-center justify-center py-20 lg:py-0">
      
      {/* --- Dynamic Animated Background --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-emerald-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* --- Left Side: Content --- */}
          <div className="flex-[1.2] text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs md:text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              New Arrival: iPhone 15 Pro Series
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-white mb-6">
              Experience the <br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Future of Mobile
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover cutting-edge technology and elegance. We bring you
              the world's finest smartphones with exclusive warranty and
              lightning-fast delivery.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-6">
              <Link to="/all-context" className="w-full sm:w-auto group relative px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3">
                Shop Now
                <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
              </Link>

              <Link to="/mobile/69849c7fd6208aa7f9ecbd08" className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-2xl hover:bg-white/10 backdrop-blur-md transition-all duration-300">
                View Gallery
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-10 flex flex-wrap gap-6 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <FaShieldAlt className="text-emerald-500" />
                </div>
                Official Warranty
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <FaTruck className="text-blue-500" />
                </div>
                Express Shipping
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <FaStar className="text-yellow-500" />
                </div>
                4.9/5 Rating
              </div>
            </div>
          </div>

          {/* --- Right Side: Phone Showcase --- */}
          <div className="flex-1 relative group order-1 lg:order-2 w-full max-w-[500px] lg:max-w-none">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-emerald-500/20 blur-[80px] rounded-full group-hover:bg-emerald-500/30 transition-all duration-700"></div>

            <div className="relative z-10 flex justify-center items-center">
              {/* Main Image Container - Stacked on mobile, side-by-side on desktop */}
              <div className="flex flex-row items-center bg-gradient-to-b from-white/10 to-transparent p-2 rounded-[2rem] md:rounded-[3rem] border border-white/20 backdrop-blur-sm shadow-2xl">
                <img 
                  src="https://i.ibb.co.com/1fTJdfBK/i-Phone-14-Pro-Deep-Purple-7300.webp"
                  alt="iPhone"
                  className="rounded-l-4xl  h-auto max-w-[180px] md:max-w-[280px] object-contain drop-shadow-2xl"
                />
                <img 
                  src="https://i.ibb.co.com/C5ByRL9c/Xundd-XDPB-021-Magnetic-Wireless-Power-Bank-10000m-Ah-Black-2027.webp"
                  alt="Power Bank"
                  className=" h-[200px] max-w-[150px] md:max-w-[240px] object-contain rounded-r-2xl"
                />
              </div>

              {/* Floating Cards - Hidden on small mobile for cleaner look */}
              <div className="absolute -right-4 top-1/4 p-3 md:p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl hidden sm:block">
                <div className="text-emerald-400 font-bold text-lg md:text-xl">$999</div>
                <div className="text-white/60 text-[10px] md:text-xs">Starting Price</div>
              </div>

              <div className="absolute -left-4 bottom-1/4 p-3 md:p-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl hidden sm:block">
                <div className="flex gap-1 text-yellow-400 mb-1">
                  {[...Array(5)].map((_, i) => <FaStar key={i} size={10} />)}
                </div>
                <div className="text-white text-[10px] md:text-xs font-medium">1.2k+ Happy Users</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Banner;