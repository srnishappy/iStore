import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Register = () => {
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
      toast.error('Password is not match');
      return;
    }
    console.log(form);
    try {
      const res = await axios.post('http://localhost:5000/api/register', form);
      console.log(res);
      toast.success(res.data);
    } catch (err) {
      console.log(err);

      const errmsg = err.response?.data?.msg || 'Something went wrong!';
      toast.error(errmsg);
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          className="border-2"
          onChange={handleOnChange}
        />
        <button className="bg-green-400 rounded-md">Register</button>
      </form>
    </div>
  );
};
export default Register;
