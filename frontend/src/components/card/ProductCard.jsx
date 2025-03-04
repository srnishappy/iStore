import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ item }) => {
  // ตรวจสอบว่า item.images เป็น array และมีค่า
  const hasImages =
    item.images && Array.isArray(item.images) && item.images.length > 0;

  return (
    <div className="shadow-lg p-3 w-50 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl rounded-lg text-white border border-gray-800">
      {/* ส่วนรูปภาพ */}
      <div className="overflow-hidden rounded-lg">
        {hasImages ? (
          <img
            src={item.images[0].url}
            alt={item.title}
            className="w-full h-32 object-cover transition-transform duration-300 hover:scale-105 rounded-md"
          />
        ) : (
          <div className="w-full h-32 bg-gray-700 rounded-lg text-center flex items-center justify-center shadow-inner">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}
      </div>

      {/* ข้อมูลสินค้า */}
      <div className="py-3 space-y-1">
        <p
          className="text-lg font-semibold text-white truncate"
          title={item.title}
        >
          {item.title}
        </p>
        <p className="text-sm text-gray-400 line-clamp-2">{item.description}</p>
      </div>

      {/* ราคาและปุ่ม */}
      <div className="flex justify-between items-center mt-3">
        <span className="text-md font-bold text-green-600">
          {item.price.toLocaleString()} ฿
        </span>
        <button className="bg-white text-black rounded-md px-3 py-1 font-medium hover:bg-gray-300 transition-all duration-200 flex items-center gap-1 active:scale-95">
          <ShoppingCart size={18} />
          <span className="text-xs">Add</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
