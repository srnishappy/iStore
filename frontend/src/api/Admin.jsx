import axios from 'axios';
export const GetOrderAdmin = async (token) =>
  await axios.get('http://localhost:5000/api/admin/orders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const ListUser = async (token) =>
  await axios.get('http://localhost:5000/api/users', {
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
export const ChangeUserStatus = async (token, value) => {
  return await axios.post('  http://localhost:5000/api/change-status', value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const ChangeUserRole = async (token, value) => {
  return await axios.post('http://localhost:5000/api/change-role', value, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
