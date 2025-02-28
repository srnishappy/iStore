import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useEcomStore from '../../store/ecom-store';
import { useNavigate } from 'react-router-dom';
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
      const errMsg = error.response.data.msg;
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border-2"
          onChange={handleOnChange}
        />
        <input
          type="text"
          name="password"
          placeholder="password"
          className="border-2"
          onChange={handleOnChange}
        />

        <button className="bg-green-400 rounded-md">login</button>
      </form>
    </div>
  );
};
export default Login;
