import { useEffect, useState } from 'react';
import { GetOrderAdmin, ChangeOrderStatus } from '../../api/Admin';
import useEcomStore from '../../store/ecom-store';
import { toast } from 'react-toastify';
import {
  RefreshCw,
  Package,
  User,
  CreditCard,
  Circle,
  Tag,
} from 'lucide-react';

const TableOrder = () => {
  const token = useEcomStore((state) => state.token);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    handleGetOrder(token);
  }, []);

  const handleGetOrder = (token) => {
    GetOrderAdmin(token)
      .then((res) => {
        setOrder(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeOrderStatus = (token, orderId, orderStatus) => {
    ChangeOrderStatus(token, orderId, orderStatus)
      .then((res) => {
        console.log(res);

        toast.success('Update Status Success');
        setOrder((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId
              ? { ...order, orderStatus: orderStatus }
              : order
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-200 text-green-800';
      case 'Pending':
        return 'bg-yellow-200 text-yellow-800';
      case 'Processing':
        return 'bg-blue-200 text-blue-800';
      case 'Shipped':
        return 'bg-indigo-200 text-indigo-800';
      case 'Out for Delivery':
        return 'bg-orange-200 text-orange-800';
      case 'Delivered':
        return 'bg-teal-200 text-teal-800';
      case 'Cancel':
        return 'bg-red-200 text-red-800';
      case 'Returned':
        return 'bg-purple-200 text-purple-800';
      case 'Failed Delivery':
        return 'bg-gray-200 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-center items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0 flex items-center gap-2 text-center">
          Manage Orders
        </h1>
      </div>

      {order.length === 0 ? (
        <div className="text-center py-20">
          <Package size={64} className="mx-auto text-gray-400" />
          <p className="mt-4 text-xl text-gray-500">No orders found</p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-gradient-to-r from-gray-800 to-blue-700 text-white">
              <tr>
                <th className="py-4 px-6 text-left font-semibold rounded-tl-lg">
                  <div className="flex items-center gap-2">
                    <Tag size={16} />
                    ID
                  </div>
                </th>
                <th className="py-4 px-6 text-left font-semibold">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    User
                  </div>
                </th>
                <th className="py-4 px-6 text-left font-semibold">
                  <div className="flex items-center gap-2">
                    <Package size={16} />
                    Products
                  </div>
                </th>
                <th className="py-4 px-6 text-left font-semibold">
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} />
                    Total
                  </div>
                </th>
                <th className="py-4 px-6 text-left font-semibold">Status</th>
                <th className="py-4 px-6 text-left font-semibold rounded-tr-lg">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {order?.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-blue-50 transition-all duration-200"
                >
                  <td className="py-4 px-6 font-medium">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      #{index + 1}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
                        <span className="text-white font-medium">
                          {item.orderedBy.email[0].toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {item.orderedBy.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <ul className="space-y-2">
                      {item.products.map((product, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-gray-800"
                        >
                          <Circle
                            size={8}
                            className="text-blue-500 fill-blue-500"
                          />
                          <span className="text-sm font-medium">
                            {product.product.title}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-lg font-semibold text-green-600">
                      {item.cartTotal.toLocaleString()} ฿
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                        item.orderStatus
                      )}`}
                    >
                      {item.orderStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <select
                      value={item.orderStatus}
                      name="order_status"
                      onChange={(e) =>
                        handleChangeOrderStatus(token, item.id, e.target.value)
                      }
                      className="border border-gray-300 rounded-lg py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                    >
                      <option>Not Process</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Out for Delivery</option>
                      <option>Delivered</option>
                      <option>Completed</option>
                      <option>Cancel</option>
                      <option>Returned</option>
                      <option>Failed Delivery</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TableOrder;
