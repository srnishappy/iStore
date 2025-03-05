import axios from 'axios';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ListCategory } from '../api/Category';
import { listProduct, searchFilters } from '../api/Product';

const ecomStroe = (set) => ({
  user: null,
  token: null,
  category: [],
  products: [],
  actionLogin: async (form) => {
    const res = await axios.post('http://localhost:5000/api/login', form);
    // console.log(res.data.token);
    set({
      user: res.data.payload,
      token: res.data.token,
    });

    return res;
  },
  getCategory: async () => {
    try {
      const res = await ListCategory();
      set({
        category: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getProducts: async (count) => {
    try {
      const res = await listProduct(count);
      set({
        products: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  },
  actionSearchFilters: async (arg) => {
    try {
      const res = await searchFilters(arg);
      set({
        products: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  },
});

const userPersist = {
  name: 'store',
  storage: createJSONStorage(() => localStorage),
};
const useEcomStore = create(persist(ecomStroe, userPersist));

export default useEcomStore;
