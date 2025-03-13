import { Calendar, ShoppingBag, Package } from 'lucide-react';

const HistoryCard = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingBag className="w-6 h-6 text-blue-500" />
        <h1 className="text-2xl font-bold text-gray-800">Order History</h1>
      </div>

      {/* Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Order date</p>
              <p className="font-semibold text-gray-800">date</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-green-500" />
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Status
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">
                  Product
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">
                  Price
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">
                  Amount
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">
                  Total price
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 border-b text-gray-700">Product</td>
                <td className="py-4 px-4 border-b text-gray-700 flex items-center gap-1">
                  <span className="text-gray-500">฿</span>
                  Price
                </td>
                <td className="py-4 px-4 border-b text-gray-700">Amount</td>
                <td className="py-4 px-4 border-b text-gray-700 flex items-center gap-1">
                  <span className="text-gray-500">฿</span>
                  Total price
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="mt-6 flex justify-end">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-blue-500 font-semibold">฿</span>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-bold text-lg text-gray-800">Number</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
