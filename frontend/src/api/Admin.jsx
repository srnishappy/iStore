import axios from 'axios';
export const GetOrderAdmin = async (token) =>
  await axios.get('http://localhost:5000/api/admin/orders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const ChangeOrderStatus = async (token, orderId, orderStatus) =>
  await axios.put(
    'http://localhost:5000/api/admin/order-status',
    {
      orderId,
      orderStatus,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
