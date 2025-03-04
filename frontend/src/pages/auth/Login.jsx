import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useEcomStore from '../../store/ecom-store';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const actionLogin = useEcomStore((state) => state.actionLogin);
  const user = useEcomStore((state) => state.user);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      redirect(role);

      toast.success('Login success');
    } catch (error) {
      console.log(error);
      const errMsg = error.response?.data?.msg || 'Login failed';
      toast.error(errMsg);
    }
  };

  const redirect = (role) => {
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white/5 backdrop-blur-lg rounded-xl border border-gray-800 p-8 shadow-2xl hover:shadow-gray-900/50 transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-center text-black mb-6 tracking-wide">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 pl-10 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-white focus:ring-1 focus:ring-white/20 transition-all duration-200 shadow-sm hover:shadow-md"
              onChange={handleOnChange}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              ✉️
            </span>
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 pl-10 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-white focus:ring-1 focus:ring-white/20 transition-all duration-200 shadow-sm hover:shadow-md"
              onChange={handleOnChange}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              🔒
            </span>
          </div>

          <button className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 tracking-tight">
            Login
          </button>
        </form>

        {/* ลิงก์ Register ที่ถูกต้อง */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
