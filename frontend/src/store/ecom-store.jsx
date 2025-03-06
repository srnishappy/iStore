import axios from 'axios';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ListCategory } from '../api/Category';
import { listProduct, searchFilters } from '../api/Product';
import _ from 'lodash';

const ecomStroe = (set, get) => ({
  user: null,
  token: null,
  category: [],
  products: [],
  carts: [],
  actionAddtoCart: async (product) => {
    const carts = get().carts;
    const updatecart = [...carts, { ...product, count: 1 }];
    const uniqe = _.unionWith(updatecart, _.isEqual);
    set({
      carts: uniqe,
    });
  },
  actionUpdateQuantity: async (productId, newQuantity) => {
    // console.log('click', productId, newQuantity);
    set((state) => ({
      carts: state.carts.map((item) =>
        item.id === productId
          ? { ...item, count: Math.max(1, newQuantity) }
          : item
      ),
    }));
  },
  actionRemoveProduct: async (productId) => {
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId),
    }));
  },
  actionGetTotalPrice: () => {
    return get().carts.reduce((total, item) => {
      return total + item.price * item.count;
    }, 0);
  },
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
