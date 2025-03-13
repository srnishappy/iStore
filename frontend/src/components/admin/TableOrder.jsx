import { useEffect, useState } from 'react';
import { GetOrderAdmin } from '../../api/Admin';
import useEcomStore from '../../store/ecom-store';

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

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Manage Orders
      </h1>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
          <thead className="bg-gradient-to-r from-gray-700 to-blue-600 text-white">
            <tr>
              <th className="py-4 px-6 text-left font-semibold rounded-tl-lg">
                Id
              </th>
              <th className="py-4 px-6 text-left font-semibold">User</th>
              <th className="py-4 px-6 text-left font-semibold">Product</th>
              <th className="py-4 px-6 text-left font-semibold">Total</th>
              <th className="py-4 px-6 text-left font-semibold">Status</th>
              <th className="py-4 px-6 text-left font-semibold rounded-tr-lg">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {order?.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
                >
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6">
                    <p className="font-medium">{item.orderedBy.email}</p>
                  </td>
                  <td className="py-4 px-6">
                    <ul className="list-disc pl-5">
                      {item.products.map((product, index) => (
                        <li key={index} className="text-gray-800 mb-2">
                          {product.product.title}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-4 px-6 text-gray-900 font-medium">
                    {item.cartTotal.toLocaleString()} ฿
                  </td>
                  <td className="py-4 px-6">{item.orderStatus}</td>
                  <td className="py-4 px-6 text-blue-500 cursor-pointer hover:underline">
                    Action
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableOrder;
