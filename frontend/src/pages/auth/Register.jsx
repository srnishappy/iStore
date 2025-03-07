import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/register', form);
      toast.success('Registration successful!');
      navigate('/login');
    } catch (err) {
      console.log(err);
      const errmsg = err.response?.data?.msg || 'Something went wrong!';
      toast.error(errmsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white rounded-xl border border-gray-800 p-8 shadow-2xl hover:shadow-gray-900/50 transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-center text-black mb-6 tracking-wide">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-4 pl-10 bg-white text-black border border-gray-400 rounded-lg placeholder-gray-500 focus:border-gray-600 focus:ring-2 focus:ring-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
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
              className="w-full p-4 pl-10 bg-white text-black border border-gray-400 rounded-lg placeholder-gray-500 focus:border-gray-600 focus:ring-2 focus:ring-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
              onChange={handleOnChange}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              🔒
            </span>
          </div>

          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-4 pl-10 bg-white text-black border border-gray-400 rounded-lg placeholder-gray-500 focus:border-gray-600 focus:ring-2 focus:ring-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
              onChange={handleOnChange}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              🔒
            </span>
          </div>

          <button className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 tracking-tight">
            Register
          </button>
        </form>

        <div className="flex justify-center mt-5 text-sm text-gray-500">
          <p>Already have an account?&nbsp;</p>
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
