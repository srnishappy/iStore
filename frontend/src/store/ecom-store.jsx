import axios from 'axios';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
const ecomStroe = (set) => ({
  user: null,
  token: null,
  actionLogin: async (form) => {
    const res = await axios.post('http://localhost:5000/api/login', form);
    // console.log(res.data.token);
    set({
      user: res.data.payload,
      token: res.data.token,
    });

    return res;
  },
});

const userPersist = {
  name: 'store',
  storage: createJSONStorage(() => localStorage),
};
const useEcomStore = create(persist(ecomStroe, userPersist));

export default useEcomStore;
