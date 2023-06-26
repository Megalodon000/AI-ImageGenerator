import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

  const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password
      });
      if (response.status === 201) {
        alert('Registration successful');
        navigate('/create-post'); 
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-900">
      <div className="bg-gray-800 p-8 shadow-lg rounded-lg">
        <h2 className="text-4xl mb-6 text-center font-bold text-white">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-200">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border-2 border-gray-400 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-200">
              Email address
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
          <div className="mb-6">
            <label htmlFor="passwordConfirmation" className="block text-gray-200">
              Password confirmation
            </label>
            <input
              type="password"
              id="passwordConfirmation"
              className="w-full border-2 border-gray-400 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
              name="passwordConfirmation"
              value={form.passwordConfirmation}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white rounded-md py-2 px-4 hover:bg-indigo-600"
            >
              {loading ? 'Signing in...' : 'Sign Up'}
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <a href="#" className="font-semibold leading-6 text-blue-400 hover:text-blue-300">
            Start a 15-day free trial
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
