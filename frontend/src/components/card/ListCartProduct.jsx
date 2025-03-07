import { ListCheck, ArrowLeft, CreditCard } from 'lucide-react';
import useEcomStore from '../../store/ecom-store';
import { Link } from 'react-router-dom';

const ListCartProduct = () => {
  const carts = useEcomStore((state) => state.carts);
  const actionGetTotalPrice = useEcomStore(
    (state) => state.actionGetTotalPrice
  );

  return (
    <div className="max-w-6xl mx-auto bg-gray-50 rounded-lg shadow-lg p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 border-b border-gray-200 pb-5">
        <ListCheck size={32} className="text-blue-600" />
        <h1 className="text-3xl font-semibold text-gray-800">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Left Side - Product List (3/5 width on medium screens and up) */}
        <div className="md:col-span-2 lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              Order Summary
            </h2>
            <p className="text-base text-gray-500">
              {carts.length} {carts.length === 1 ? 'item' : 'items'} in your
              cart
            </p>
          </div>

          {/* Cart Items Container */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            {carts.length === 0 ? (
              <div className="p-6 text-center text-gray-400">
                <p>Your cart is empty</p>
              </div>
            ) : (
              carts.map((item, index) => (
                <div
                  key={index}
                  className={`p-5 ${
                    index !== carts.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  {/* Item Details */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      {item.images && item.images.length > 0 ? (
                        <img
                          src={item.images[0].url}
                          alt={item.title}
                          className="w-24 h-24 bg-gray-100 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                          No Image
                        </div>
                      )}

                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-lg">
                          {item.title}
                        </p>
                        <p className="text-base text-gray-500">
                          {item.price} ฿ x {item.count}
                        </p>
                      </div>
                    </div>
                    <div className="font-bold text-lg text-blue-600">
                      {item.price * item.count} ฿
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Back to Cart Button */}
          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft size={18} />
            <Link to="/shop">Back to Cart</Link>
          </button>
        </div>

        {/* Right Side - Order Summary (2/5 width on medium screens and up) */}
        <div className="md:col-span-1 lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">
              Payment Summary
            </h2>

            {/* Order details */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{actionGetTotalPrice()} ฿</span>
              </div>

              <div className="border-t border-gray-200 pt-3 mt-3"></div>
              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span className="text-blue-600">{actionGetTotalPrice()} ฿</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-4">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-full py-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-3">
                <ArrowLeft size={20} />
                <span>Edit Cart</span>
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-3">
                <CreditCard size={20} />
                <span>Proceed to Payment</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCartProduct;
