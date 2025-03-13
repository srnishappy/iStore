import {
  CalendarDays,
  ShoppingBag,
  Package,
  CheckCircle,
  Clock,
  Receipt,
  BadgeCheck,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import useEcomStore from '../../store/ecom-store';
import { getOrder } from '../../api/User';

const HistoryCard = () => {
  const [orders, setOrders] = useState([]);
  const token = useEcomStore((state) => state.token);

  useEffect(() => {
    if (token) {
      handleGetOrder(token);
    }
  }, [token]);

  const handleGetOrder = (token) => {
    getOrder(token)
      .then((res) => {
        setOrders(res.data.orders || []);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Status color and icon functions
  const getStatusInfo = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return {
          color: 'bg-green-100 text-green-800',
          icon: <CheckCircle className="w-4 h-4 mr-1" />,
        };
      case 'Not Process':
        return {
          color: 'bg-blue-100 text-blue-800',
          icon: <Clock className="w-4 h-4 mr-1" />,
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: <Package className="w-4 h-4 mr-1" />,
        };
    }
  };

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-5xl w-full mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-2 rounded-lg">
          <Receipt className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Order History
        </h1>
      </div>

      {orders.length > 0 ? (
        orders.map((item, index) => {
          const totalAmount = item?.products?.reduce(
            (sum, product) =>
              sum + (product?.count || 0) * (product?.product?.price || 0),
            0
          );

          const statusInfo = getStatusInfo(item.orderStatus);

          return (
            <div
              key={index}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-200 mb-6 hover:shadow-lg transition-shadow"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                <div className="flex items-center gap-3">
                  <CalendarDays className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Order date</p>
                    <p className="text-base font-medium text-gray-700">
                      {formatDate(item.updatedAt)}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-md text-sm font-medium flex items-center ${statusInfo.color}`}
                >
                  {statusInfo.icon}
                  {item.orderStatus || 'Unknown'}
                </span>
              </div>

              {/* Products Table */}
              <div className="overflow-auto rounded-lg border border-gray-200">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 border-b">
                        Product
                      </th>
                      <th className="py-3 px-4 text-right text-sm font-semibold text-gray-600 border-b">
                        Price
                      </th>
                      <th className="py-3 px-4 text-right text-sm font-semibold text-gray-600 border-b">
                        Amount
                      </th>
                      <th className="py-3 px-4 text-right text-sm font-semibold text-gray-600 border-b">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {item?.products?.map((product, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 text-gray-800 flex items-center gap-3">
                          <ShoppingBag className="w-5 h-5 text-gray-600" />
                          <span className="font-medium text-sm sm:text-base">
                            {product?.product?.title || 'N/A'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-700 text-right text-sm sm:text-base">
                          ฿
                          {(product?.product?.price || 0).toLocaleString(
                            'th-TH'
                          )}
                        </td>
                        <td className="py-3 px-4 text-gray-700 text-right">
                          <span className="bg-gray-100 px-3 py-1.5 rounded-md text-sm sm:text-base">
                            {product?.count || 0}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-800 font-medium text-right text-sm sm:text-base">
                          ฿
                          {(
                            (product?.count || 0) *
                            (product?.product?.price || 0)
                          ).toLocaleString('th-TH')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total Amount */}
              <div className="mt-6 flex justify-end">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 max-w-xs">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500 text-white p-3 rounded-full">
                      <BadgeCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-700">Total Amount</p>
                      <p className="font-bold text-xl text-blue-800">
                        ฿{totalAmount.toLocaleString('th-TH')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-600">No orders found</p>
      )}
    </div>
  );
};

export default HistoryCard;
