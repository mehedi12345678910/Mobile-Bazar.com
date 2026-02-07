import { Link } from 'react-router';

const Card = ({ mobile }) => {
  const { _id, name, image, quantity, price, category } = mobile || {};

  return (
    <Link
      to={`/mobile/${_id}`}
      className='group bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden flex flex-col'
    >
      {/* Image Container */}
      <div className='relative aspect-[4/5] overflow-hidden bg-gray-50'>
        <img
          className='object-contain h-full w-full p-4 group-hover:scale-105 transition-transform duration-500'
          src={image}
          alt={name}
        />
        
        {/* Category Badge */}
        <div className='absolute top-3 left-3'>
          <span className='bg-white/80 backdrop-blur-sm text-gray-700 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md shadow-sm'>
            {category}
          </span>
        </div>

        {/* Stock Status */}
        {quantity > 0 ? (
          <div className='absolute bottom-3 right-3 text-[11px] font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full'>
            In Stock: {quantity}
          </div>
        ) : (
          <div className='absolute bottom-3 right-3 text-[11px] font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded-full'>
            Out of Stock
          </div>
        )}
      </div>

      {/* Content */}
      <div className='p-5 flex flex-col flex-grow'>
        <h3 className='text-gray-900 font-bold text-lg mb-1 truncate group-hover:text-blue-600 transition-colors'>
          {name}
        </h3>
        
        <div className='flex items-center justify-between mt-auto pt-4 border-t border-gray-50'>
          <div className='flex flex-col'>
            <span className='text-gray-400 text-xs uppercase font-semibold'>Price</span>
            <span className='text-xl font-extrabold text-gray-900'>${price}</span>
          </div>
          
          <button className='bg-black text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-800'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Card;