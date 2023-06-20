import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Loader } from '../components';

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

    if (form.email && form.password) {
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:8080/api/v1/login', {
          email: form.email,
          password: form.password,
        });

        // Process response if needed

        alert('Login successful');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please provide proper email and password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-800">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border-gray-400 rounded-md py-2 px-3 focus:outline-none
               focus:ring-2 focus:ring-blue-500"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-800">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border-gray-400 rounded-md py-2 px-3 focus:outline-none
               focus:ring-2 focus:ring-blue-500"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-900 text-white rounded-md py-2 px-4
                    hover:bg-blue-600"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
