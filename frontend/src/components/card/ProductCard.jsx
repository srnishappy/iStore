import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

const ProductCard = ({ item }) => {
  // ตรวจสอบว่า item.images เป็น array และมีค่า
  const hasImages =
    item.images && Array.isArray(item.images) && item.images.length > 0;

  return (
    <div className="shadow-md p-2 w-50 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg rounded-lg bg-white">
      {/* ส่วนรูปภาพ - เพิ่มการซูมเล็กน้อยเมื่อ hover */}
      <div className="overflow-hidden rounded-lg">
        {hasImages ? (
          <img
            src={item.images[0].url}
            alt={item.title}
            className="w-full h-24 object-cover transition-transform duration-300 hover:scale-110"
          />
        ) : (
          <div className="w-full h-24 bg-gray-200 rounded-lg text-center flex items-center justify-center shadow">
            <span className="text-gray-500 text-sm">No Image</span>
          </div>
        )}
      </div>

      {/* ส่วนข้อมูลสินค้า */}
      <div className="py-2 space-y-1">
        <p
          className="text-xl font-bold text-gray-800 truncate"
          title={item.title}
        >
          {item.title}
        </p>
        <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
      </div>

      {/* ส่วนราคาและปุ่ม */}
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm font-bold text-green-600">
          {item.price.toLocaleString()} ฿
        </span>
        <button className="bg-blue-500 rounded-md px-2 py-1 text-white hover:bg-blue-700 transition-all duration-200 flex items-center gap-1 active:scale-95">
          <ShoppingCart size={18} />
          <span className="text-xs">Add</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
