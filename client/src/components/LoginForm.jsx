import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', {
        email: form.email,
        password: form.password,
      });
      const token = response.data.token;
      // Store the token in local storage or cookies
      localStorage.setItem('token', token);
      navigate('/CreatePost');
    } catch (error) {
      console.error(error);
      alert('Invalid email or password');
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 shadow-lg rounded-lg">
        <h2 className="text-4xl mb-6 text-center font-bold text-white">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-200">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border-2 border-gray-400 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-200">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border-2 border-gray-400 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white rounded-md py-2 px-4 hover:bg-indigo-600"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default LoginForm;
