import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaMobileAlt
} from 'react-icons/fa';

import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className='bg-white border-t border-neutral-100 pt-16 pb-8 mt-20'>
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12'>
          
          {/* 1. Brand Section */}
          <div className='space-y-6'>
           <Link to="/" className="flex items-center gap-2 group select-none">
              <div className="p-2 rounded-xl bg-gradient-to-br from-lime-400 to-green-600 shadow-lg group-hover:scale-105 transition-transform duration-300">
                <FaMobileAlt className="text-white text-xl" />
              </div>

              <h1 className="text-2xl font-extrabold tracking-wide">
                <span className="bg-gradient-to-r from-lime-400 via-green-500 to-emerald-500 bg-clip-text text-transparent">
                  Mobile
                </span>
                <span className="text-gray-800 text-green-500">Bazar</span>
                <span className="text-sm text-lime-500 ml-1">.com</span>
              </h1>
            </Link>
            <p className='text-neutral-500 text-sm leading-relaxed'>
              Your trusted partner for premium mobile devices. Quality and authenticity guaranteed.
            </p>
            <div className='flex items-center gap-4'>
              <a href='#' className='p-2.5 bg-neutral-50 rounded-full text-neutral-600 hover:bg-neutral-900 hover:text-white transition-all'><FaFacebookF size={14}/></a>
              <a href='#' className='p-2.5 bg-neutral-50 rounded-full text-neutral-600 hover:bg-neutral-900 hover:text-white transition-all'><FaTwitter size={14}/></a>
              <a href='#' className='p-2.5 bg-neutral-50 rounded-full text-neutral-600 hover:bg-neutral-900 hover:text-white transition-all'><FaInstagram size={14}/></a>
              <a href='#' className='p-2.5 bg-neutral-50 rounded-full text-neutral-600 hover:bg-neutral-900 hover:text-white transition-all'><FaLinkedinIn size={14}/></a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className='text-neutral-900 font-bold mb-6'>Explore</h3>
            <ul className='space-y-4 text-sm text-neutral-500 font-medium'>
              <li><Link to='/mobiles' className='hover:text-black transition'>All Mobiles</Link></li>
              <li><Link to='/dashboard' className='hover:text-black transition'>Dashboard</Link></li>
              <li><Link to='/about' className='hover:text-black transition'>Our Story</Link></li>
            </ul>
          </div>

          {/* 3. Contact Info */}
          <div>
            <h3 className='text-neutral-900 font-bold mb-6'>Contact Us</h3>
            <ul className='space-y-4 text-sm text-neutral-500'>
              <li className='flex items-center gap-3'>
                <FaEnvelope className='text-blue-500' />
                <span>support@mobilehub.com</span>
              </li>
              <li className='flex items-center gap-3'>
                <FaPhoneAlt className='text-green-500' />
                <span>+880 1326 018 868</span>
              </li>
              <li className='flex items-center gap-3'>
                <FaMapMarkerAlt className='text-red-500' />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* 4. Newsletter */}
          <div>
            <h3 className='text-neutral-900 font-bold mb-6'>Join Our Newsletter</h3>
            <form className='flex flex-col gap-3'>
              <input 
                type="email" 
                placeholder="Your Email" 
                className='bg-neutral-50 border border-neutral-200 outline-none px-4 py-2.5 rounded-xl text-sm focus:border-neutral-400 transition'
              />
              <button className='bg-neutral-900 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-neutral-800 transition'>
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className='border-t border-neutral-100 pt-8 text-center text-xs text-neutral-400 font-medium'>
          <p>© 2025-2026 MobileHub. Built with ❤️ for Gadget Lovers.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;