import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { payment } from '../../api/Stripe';
import useEcomStore from '../../store/ecom-store';
import CheckoutForm from '../../components/CheckoutForm';
import { ShoppingBag, MapPin, CreditCard } from 'lucide-react';

const stripePromise = loadStripe(
  'pk_test_51R0IYZDY7BNXdbIMe5UmnxfjO4Si1eA9NPUkAARHuOgLrfY1PFlGY5NtY2dZ6lSIARdVOlN5LA9mvHzMtbrFjZcf00kMDnEpjc'
);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState('');
  const token = useEcomStore((state) => state.token);

  useEffect(() => {
    payment(token)
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => console.log(err));
  }, []);

  const appearance = {
    theme: 'flat',
    labels: 'floating', // Label จะลอยอยู่เหนือ input
    variables: {
      fontFamily: "'Roboto', sans-serif",
      fontSize: '16px',
      inputTextColor: '#333',
      inputBackgroundColor: '#f7f7f7',
      inputBorderColor: '#ccc',
      inputBorderFocusColor: '#0066ff',
      inputTextColor: '#333',
      buttonBackgroundColor: '#0066ff',
      buttonTextColor: '#ffffff',
      buttonBorderColor: '#0066ff',
    },
  };

  const loader = 'auto'; // ตัวเลือกสำหรับ loader เป็น 'auto' หรือ 'dots'

  // เพิ่มการตั้งค่า locale ให้เป็นภาษาอังกฤษ
  const options = {
    clientSecret,
    appearance,
    loader,
    locale: 'en', // ตั้งค่า locale เป็น 'en' สำหรับภาษาอังกฤษ
  };

  return (
    <div className="max-w-full mx-auto p-4">
      {/* ส่วน Header แบบใหม่ที่กว้างขึ้นและทุกไอคอนเป็นสีฟ้า */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          {/* Cart */}
          <div className="flex flex-col items-center">
            <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center mb-1">
              <ShoppingBag size={18} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">Cart</span>
          </div>
          {/* เส้นเชื่อม Cart - Checkout */}
          {/* ปรับ margin-top หรือ margin-bottom ที่นี่เพื่อเปลี่ยนความสูงของเส้น */}
          <div className="w-24 h-1 bg-blue-600 rounded-full mt-2 mb-5"></div>{' '}
          {/* ปรับ margin-top ให้เล็กลงหรือเพิ่มเพื่อลดระยะห่าง */}
          {/* Checkout */}
          <div className="flex flex-col items-center">
            <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center mb-1">
              <MapPin size={18} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">Checkout</span>
          </div>
          {/* เส้นเชื่อม Checkout - Payment */}
          {/* ปรับ margin-top หรือ margin-bottom ที่นี่เพื่อเปลี่ยนความสูงของเส้น */}
          <div className="w-24 h-1 bg-blue-600 rounded-full mt-2 mb-5"></div>{' '}
          {/* ปรับ margin-top ให้เล็กลงหรือเพิ่มเพื่อลดระยะห่าง */}
          {/* Payment */}
          <div className="flex flex-col items-center">
            <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center mb-1">
              <CreditCard size={18} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">Payment</span>
          </div>
        </div>
      </div>

      {/* Stripe Elements */}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <div className="max-w-4xl mx-auto min-h-screen p-6">
            {' '}
            {/* เพิ่ม min-h-screen เพื่อให้ฟอร์มยาวเต็มหน้าจอ */}
            <CheckoutForm />
          </div>
        </Elements>
      )}
    </div>
  );
};

export default Payment;
