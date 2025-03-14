import {
  ShoppingBag,
  Truck,
  Tag,
  CreditCard,
  MapPin,
  Ticket,
} from 'lucide-react';
import useEcomStore from '../../store/ecom-store';
import { ListUserCart, SaveAddress } from '../../api/User';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SummaryCard = () => {
  const token = useEcomStore((state) => state.token);
  const carts = useEcomStore((state) => state.carts);

  const [products, setProducts] = useState([]);
  const [carttotal, setCartTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [AddressSave, setAddressSave] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetUserCart(token);
  }, []);

  const handleClickPayment = () => {
    if (!AddressSave) {
      toast.error('Please save your address');
      return;
    }
    navigate('/user/payment');
  };

  const handleGetUserCart = (token) => {
    ListUserCart(token)
      .then((res) => {
        setProducts(res.data.products);
        setCartTotal(res.data.cartTotal);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSaveAddress = () => {
    console.log(address);
    if (!address.trim()) {
      toast.warning('Please enter your address');
      return; // หยุดการทำงานหากไม่มีการป้อนที่อยู่
    }
    SaveAddress(token, address)
      .then((res) => {
        console.log(res);
        toast.success('Address saved successfully');
        setAddressSave(true); // ตั้งค่า AddressSave เป็น true เมื่อบันทึกสำเร็จ
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function to format numbers with commas
  const formatPrice = (price) => {
    return new Intl.NumberFormat().format(price);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header steps */}
      <div className="mb-6 flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center">
            <ShoppingBag size={16} className="text-white" />
          </div>
          <span className="font-medium text-gray-700">Cart</span>
        </div>
        <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center">
            <MapPin size={16} className="text-white" />
          </div>
          <span className="font-medium text-gray-700">Checkout</span>
        </div>
        <div className="w-16 h-1 bg-gray-200 rounded-full"></div>
        <div className="flex items-center gap-2">
          <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center">
            <CreditCard size={16} className="text-gray-500" />
          </div>
          <span className="text-gray-400">Payment</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left - Shipping Address */}
        <div className="w-full md:w-1/2">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md space-y-4 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
              <div className="bg-blue-50 p-2 rounded-lg">
                <MapPin className="text-blue-600" size={20} />
              </div>
              <h1 className="text-lg font-bold text-gray-800">
                Shipping Address
              </h1>
            </div>

            <textarea
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none min-h-24 bg-gray-50"
              placeholder="Enter your shipping address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <button
              onClick={handleSaveAddress}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200 font-medium flex items-center justify-center gap-2 w-full"
            >
              <CreditCard size={18} />
              <span>Save Address</span>
            </button>
          </div>
        </div>

        {/* Right - Order Summary */}
        <div className="w-full md:w-1/2">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="bg-blue-50 p-2 rounded-lg">
                <ShoppingBag className="text-blue-600" size={20} />
              </div>
              <h1 className="text-lg font-bold text-gray-800">Order Summary</h1>
            </div>

            <div className="space-y-3 pr-2 mb-6 overflow-x-auto">
              {products?.map((item, index) => (
                <div
                  key={index}
                  className="group hover:scale-[1.01] transition-all duration-200"
                >
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100 group-hover:border-blue-100 group-hover:shadow-sm min-w-[300px]">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors text-sm word-break-break-word truncate">
                          {item.product.title}
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                            Total: {item.count}
                          </span>
                          <span className="mx-2">×</span>
                          <span className="font-medium">
                            {formatPrice(item.product.price)}฿
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-blue-600 font-bold bg-blue-50 px-8 rounded-lg text-sm">
                        {formatPrice(item.count * item.product.price)}฿
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-gray-100 pt-4">
              <div className="flex justify-between text-gray-600 p-2 hover:bg-gray-50 rounded-lg transition-colors text-sm">
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-green-500" />
                  <p>Shipping</p>
                </div>
                <p className="text-green-600 font-medium">Free</p>
              </div>

              <div className="flex justify-between text-gray-600 p-2 hover:bg-gray-50 rounded-lg transition-colors text-sm">
                <div className="flex items-center gap-2">
                  <Ticket size={16} className="text-orange-500" />
                  <p>Discount</p>
                </div>
                <p>-</p>
              </div>

              <div className="border-t border-gray-100 pt-4 mt-3"></div>

              <div className="flex justify-between bg-blue-50 p-3 rounded-lg">
                <p className="font-bold text-gray-800 text-sm">Total Amount</p>
                <div className="relative">
                  <p className="text-blue-600 font-bold text-lg">
                    ฿{formatPrice(carttotal)}
                  </p>
                  <div className="absolute -bottom-1 left-0 w-full h-1 bg-blue-600 opacity-20 rounded-full"></div>
                </div>
              </div>

              <button
                // disabled={!AddressSave}
                onClick={handleClickPayment}
                className="mt-4 bg-blue-600 text-white w-full py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <CreditCard size={18} />
                <span>Proceed to Payment</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
