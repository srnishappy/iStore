import {
  ListCheck,
  ArrowLeft,
  CreditCard,
  ShoppingBag,
  MapPin,
} from 'lucide-react';
import useEcomStore from '../../store/ecom-store';
import { Link, useNavigate } from 'react-router-dom'; // เพิ่ม useNavigate
import { createUserCart } from '../../api/User';
import { toast } from 'react-toastify';

const ListCartProduct = () => {
  const cart = useEcomStore((state) => state.carts);
  const actionGetTotalPrice = useEcomStore(
    (state) => state.actionGetTotalPrice
  );
  const user = useEcomStore((state) => state.user);
  const token = useEcomStore((state) => state.token);
  const navigate = useNavigate(); // ใช้ useNavigate

  // Function to format numbers with commas
  const formatPrice = (price) => {
    return new Intl.NumberFormat().format(price);
  };

  const handleSaveCart = async () => {
    try {
      const res = await createUserCart(token, { cart });
      console.log(res);
      // หากบันทึกสำเร็จ ให้ navigate ไปยังหน้าถัดไป
      navigate('/checkout');
    } catch (err) {
      toast.warning(err.response.data.message);
      // ไม่ต้อง navigate หากเกิดข้อผิดพลาด
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header steps - สอดคล้องกับ SummaryCard */}
      <div className="mb-6 flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center">
            <ShoppingBag size={16} className="text-white" />
          </div>
          <span className="font-medium text-gray-700">Cart</span>
        </div>
        <div className="w-16 h-1 bg-gray-200 rounded-full"></div>
        <div className="flex items-center gap-2">
          <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center">
            <MapPin size={16} className="text-gray-500" />
          </div>
          <span className="text-gray-400">Checkout</span>
        </div>
        <div className="w-16 h-1 bg-gray-200 rounded-full"></div>
        <div className="flex items-center gap-2">
          <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center">
            <CreditCard size={16} className="text-gray-500" />
          </div>
          <span className="text-gray-400">Payment</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-5">
          <div className="bg-blue-50 p-2 rounded-lg">
            <ShoppingBag size={20} className="text-blue-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">Shopping Cart</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side - Product List */}
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                Order Summary
              </h2>
              <p className="text-sm text-gray-500">
                {cart.length} {cart.length === 1 ? 'item' : 'items'} in your
                cart
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden mb-6 border border-gray-100">
              {cart.length === 0 ? (
                <div className="p-6 text-center text-gray-400">
                  <p>Your cart is empty</p>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 group hover:scale-[1.01] transition-all duration-200 ${
                      index !== cart.length - 1
                        ? 'border-b border-gray-100'
                        : ''
                    }`}
                  >
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100 group-hover:border-blue-100 group-hover:shadow-sm">
                      <div className="flex gap-3 items-center">
                        {item.images && item.images.length > 0 ? (
                          <img
                            src={item.images[0].url}
                            alt={item.title}
                            className="w-16 h-16 bg-gray-100 rounded-lg object-cover border border-gray-200"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
                            <ListCheck size={20} />
                          </div>
                        )}

                        <div className="flex-1">
                          <p className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors text-sm">
                            {item.title}
                          </p>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                              Qty: {item.count}
                            </span>
                            <span className="mx-2">×</span>
                            <span className="font-medium">
                              ฿{formatPrice(item.price)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-lg text-sm">
                          ฿{formatPrice(item.price * item.count)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <Link to="/shop">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors flex items-center gap-3 w-full md:w-auto">
                <ArrowLeft size={18} />
                <span>Continue Shopping</span>
              </button>
            </Link>
          </div>

          {/* Right Side - Order Summary */}
          <div>
            <div className="bg-white rounded-lg border border-gray-200 shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <CreditCard className="text-blue-600" size={20} />
                </div>
                <h2 className="text-lg font-bold text-gray-800">
                  Payment Summary
                </h2>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 p-2 hover:bg-gray-50 rounded-lg transition-colors text-sm">
                  <span>Subtotal</span>
                  <span>฿{formatPrice(actionGetTotalPrice())}</span>
                </div>

                <div className="flex justify-between text-gray-600 p-2 hover:bg-gray-50 rounded-lg transition-colors text-sm">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-500"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M7 15h0M2 9.5h20" />
                    </svg>
                    <span>Shipping</span>
                  </div>
                  <span className="text-green-600 font-medium">Free</span>
                </div>

                <div className="border-t border-gray-100 pt-4 mt-3"></div>
                <div className="flex justify-between bg-blue-50 p-3 rounded-lg">
                  <span className="font-bold text-gray-800 text-sm">Total</span>
                  <div className="relative">
                    <span className="text-blue-600 font-bold text-lg">
                      ฿{formatPrice(actionGetTotalPrice())}
                    </span>
                    <div className="absolute -bottom-1 left-0 w-full h-1 bg-blue-600 opacity-20 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {user ? (
                  <button
                    disabled={cart.length === 0}
                    onClick={handleSaveCart}
                    className="bg-blue-600 text-white w-full py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <MapPin size={18} />
                    <span>Proceed to Checkout</span>
                  </button>
                ) : (
                  <Link to="/login">
                    <button className="bg-red-500 hover:bg-red-600 text-white w-full py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-3 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 3h4a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-4" />
                        <path d="M10 3H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4" />
                        <path d="M10 12l6-6" />
                        <path d="M16 6l-6 6" />
                      </svg>
                      <span>Login to Checkout</span>
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCartProduct;
