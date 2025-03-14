import { Trash2, ShoppingBag } from 'lucide-react';
import useEcomStore from '../../store/ecom-store';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const CartCard = ({ onClose }) => {
  const carts = useEcomStore((state) => state.carts);
  const actionUpdateQuantity = useEcomStore(
    (state) => state.actionUpdateQuantity
  );
  const actionRemoveProduct = useEcomStore(
    (state) => state.actionRemoveProduct
  );
  const actionGetTotalPrice = useEcomStore(
    (state) => state.actionGetTotalPrice
  );

  // ฟังก์ชันที่ใช้ในการ format ราคา
  const formatPrice = (price) => {
    return new Intl.NumberFormat('th-TH').format(price); // ใช้รูปแบบของไทย (th-TH)
  };

  return (
    <div className="w-full bg-[#1E1E1E] text-white p-4 sm:p-6 rounded-2xl shadow-2xl">
      {/* Header */}
      <div className="flex items-center space-x-2 text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        <ShoppingBag className="text-blue-400" size={24} />
        <h1>Your Cart</h1>
      </div>

      {/* Cart Items Container */}
      <div className="bg-[#2C2C2C] rounded-xl mb-4 sm:mb-6 overflow-hidden">
        {carts.length === 0 ? (
          <div className="p-4 sm:p-6 text-center text-gray-400">
            <p>Your cart is empty</p>
          </div>
        ) : (
          carts.map((item, index) => (
            <div
              key={index}
              className={`p-3 sm:p-4 ${
                index !== carts.length - 1 ? 'border-b border-[#3C3C3C]' : ''
              }`}
            >
              {/* Row 1: Item Details */}
              <div className="flex justify-between mb-3 sm:mb-4">
                <div className="flex gap-2 sm:gap-3 items-center">
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={item.images[0].url}
                      alt={item.title}
                      className="w-12 h-12 sm:w-16 sm:h-16 bg-[#3C3C3C] rounded-lg flex items-center justify-center object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#3C3C3C] rounded-lg flex items-center justify-center text-gray-400 text-xs">
                      No Image
                    </div>
                  )}

                  <div className="flex-1">
                    <p className="font-bold text-blue-100 text-sm sm:text-base truncate max-w-[150px] sm:max-w-none">
                      {item.title}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </div>
                {/* Remove Button */}
                <div
                  className="text-red-400 hover:text-red-300 cursor-pointer p-1 sm:p-2 transition-colors"
                  onClick={() => actionRemoveProduct(item.id)}
                >
                  <Trash2 size={16} />
                </div>
              </div>

              {/* Row 2: Quantity and Price */}
              <div className="flex justify-between items-center">
                {/* Quantity Controls */}
                <div className="flex items-center bg-[#1E1E1E] rounded-lg overflow-hidden">
                  <button
                    className="px-2 sm:px-3 py-1 sm:py-2 hover:bg-[#3C3C3C] text-white transition-colors"
                    onClick={() =>
                      actionUpdateQuantity(item.id, item.count - 1)
                    }
                    disabled={item.count <= 1}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-2 sm:px-4 py-1 sm:py-2 text-center min-w-6 sm:min-w-8">
                    {item.count}
                  </span>
                  <button
                    className="px-2 sm:px-3 py-1 sm:py-2 hover:bg-[#3C3C3C] text-white transition-colors"
                    onClick={() =>
                      actionUpdateQuantity(item.id, item.count + 1)
                    }
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                {/* Price */}
                <div className="font-bold text-blue-200">
                  <span>{formatPrice(item.price * item.count)}</span>
                  <span className="ml-1">฿</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-[#2C2C2C] rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
        <div className="flex justify-between py-2 text-base sm:text-lg font-bold">
          <span>Total</span>
          <span className="text-blue-300">
            {formatPrice(actionGetTotalPrice())} ฿
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <Link
        to={carts.length === 0 ? '#' : '/cart'}
        onClick={(e) => {
          if (carts.length === 0) {
            e.preventDefault(); // ป้องกันการเปลี่ยนหน้า
            toast.error('Your cart is empty');
          } else if (onClose) {
            // เรียก onClose เพื่อปิด mobile cart (ถ้ามี)
            onClose();
          }
        }}
        className="block w-full"
      >
        <button className="bg-blue-600 hover:bg-blue-500 text-white w-full py-2 sm:py-3 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2">
          <ShoppingBag size={18} />
          <span>Proceed to Checkout</span>
        </button>
      </Link>
    </div>
  );
};

export default CartCard;
