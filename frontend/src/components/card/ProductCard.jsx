import { ShoppingCart } from 'lucide-react';
import useEcomStore from '../../store/ecom-store';

const ProductCard = ({ item }) => {
  const hasImages =
    item.images && Array.isArray(item.images) && item.images.length > 0;
  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart);

  return (
    <div className="bg-[#1E1E1E] shadow-2xl rounded-2xl overflow-hidden w-full transform transition-all duration-300 hover:scale-105 hover:shadow-4xl relative group">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        {hasImages ? (
          <img
            src={item.images[0].url}
            alt={item.title}
            className="w-full h-40 sm:h-32 md:h-40 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-40 sm:h-32 md:h-40 bg-[#2C2C2C] flex items-center justify-center">
            <span className="text-gray-500 text-sm">No Image</span>
          </div>
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Product Details */}
      <div className="p-3 sm:p-4 space-y-2">
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <h3
              className="text-base sm:text-lg font-semibold text-white truncate max-w-[70%]"
              title={item.title}
            >
              {item.title}
            </h3>
            <span className="text-xs bg-[#4A90E2] text-white px-2 py-1 rounded-full">
              New
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm sm:text-md font-bold text-[#4A90E2]">
            {item.price.toLocaleString()} ฿
          </span>
          <button
            onClick={() => actionAddtoCart(item)}
            className="bg-[#4A90E2] text-white rounded-md px-2 sm:px-3 py-1 
            flex items-center gap-1 
            hover:bg-[#3A80D2] active:scale-95 
            transition-all duration-300 
            shadow-md hover:shadow-lg
            group/btn"
            aria-label={`Add ${item.title} to cart`}
          >
            <ShoppingCart
              size={16}
              className="group-hover/btn:animate-bounce"
            />
            <span className="text-xs cursor-pointer">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
