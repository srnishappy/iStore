import { ShoppingCart } from 'lucide-react';
import useEcomStore from '../../store/ecom-store';

const ProductCard = ({ item }) => {
  const hasImages =
    item.images && Array.isArray(item.images) && item.images.length > 0;
  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart);

  return (
    <div className="bg-[#1E1E1E] shadow-lg rounded-2xl overflow-hidden w-50 transition-all duration-300 hover:scale-[1.05] hover:shadow-xl relative group ml-4">
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-t-2xl">
        {hasImages ? (
          <img
            src={item.images[0].url}
            alt={item.title}
            className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-40 bg-gray-800 flex items-center justify-center">
            <span className="text-gray-500 text-sm">No Image</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-3">
        {/* Title & New Label */}
        <div className="flex justify-between items-center">
          <h3
            className="text-lg font-semibold text-white truncate max-w-[70%]"
            title={item.title}
          >
            {item.title}
          </h3>
          {item.isNew && (
            <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
              New
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 line-clamp-2">{item.description}</p>

        {/* Price & Add to Cart */}
        <div className="flex justify-between items-center mt-3">
          <span className="text-lg font-bold text-blue-400">
            {item.price.toLocaleString()} ฿
          </span>
          <button
            onClick={() => actionAddtoCart(item)}
            className="bg-blue-500 text-white rounded-md px-4 py-2 flex items-center gap-2 hover:bg-blue-600 active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <ShoppingCart size={18} />
            <span className="text-sm">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
