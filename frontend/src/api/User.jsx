import axios from 'axios';
export const createUserCart = async (token, cart) => {
  return await axios.post('http://localhost:5000/api/user/cart', cart, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const ListUserCart = async (token) => {
  return await axios.get('http://localhost:5000/api/user/cart', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const SaveAddress = async (token, address) => {
  return await axios.post(
    'http://localhost:5000/api/user/address',
    { address },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const SaveOrder = async (token, payload) => {
  return await axios.post('http://localhost:5000/api/user/order', payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
