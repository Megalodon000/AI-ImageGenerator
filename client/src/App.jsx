import React from 'react';
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom';
import { logo1 } from './assets';
import { Home, CreatePost } from './Pages';
import {LoginForm} from './components';
import {Register} from './components';

const PrivateRoute = ({ element: Element, isAuthenticated, ...rest }) => {
  return isAuthenticated ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

const App = () => {
  // Assuming the isAuthenticated status
  const isAuthenticated = true;

  return (
    <BrowserRouter>
      <header className="bg-[#081c15] w-full flex justify-between items-center sm:px-8 p-1 border-b border-b-[#e6ebf4] shadow-card">
        <div>
          <Link to="/">
            <img src={logo1} alt="logo" className="w-14 object-contain" />
          </Link>
        </div>
        <div className="flex gap-6">
          <Link
            to="/create-post"
            className="font-inter border border-white font-medium bg-[#081c15] text-white px-4 py-2 rounded-md"
          >
            Create
          </Link>
          <Link
            to="/register"
            className="font-inter border border-white font-medium bg-[#081c15] text-white px-4 py-2 rounded-md"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="font-inter border border-white font-medium bg-[#081c15] text-white px-4 py-2 rounded-md"
          >
            Login
          </Link>
        </div>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f5f5f5] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/create-post"
            element={<PrivateRoute element={<CreatePost />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/register"
            element={<PrivateRoute element={<Register />} isAuthenticated={isAuthenticated} />}
          />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;