import axios from 'axios';
export const createProduct = async (token, form) => {
  return await axios.post('http://localhost:5000/api/product', form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listProduct = async (count = 20) => {
  return axios.get(`http://localhost:5000/api/products/` + count);
};

export const readProduct = async (token, id) => {
  // code body
  return axios.get('http://localhost:5000/api/product/' + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteProduct = async (token, id) => {
  // code body
  return axios.delete('http://localhost:5000/api/product/' + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProduct = async (token, id, form) => {
  return axios.put(`http://localhost:5000/api/product/` + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadFiles = async (token, form) => {
  return await axios.post(
    'http://localhost:5000/api/images',
    {
      image: form,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const removeFiles = async (token, public_id) => {
  // code
  // console.log('form api frontent', form)
  return axios.post(
    'http://localhost:5000/api/removeimage',
    {
      public_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
