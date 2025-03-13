import axios from 'axios';
export const GetOrderAdmin = async (token) =>
  await axios.get('http://localhost:5000/api/admin/orders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
