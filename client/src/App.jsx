import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { logo } from './assets';
import Register from './Pages/register';
import { Home, CreatePost } from './Pages';
import LoginForm from './Pages/login';


const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center
        bg-white sm:px-8 px-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        <Link to="/create-post" className="font-inter font-medium bg-gradient-to-b from-blue-300 via-purple-400 to-pink-400 text-white px-4 py-2 rounded-md">Create</Link>
        <Link to="/register" className="font-inter font-medium  text-black px-4 py-2 rounded-md border border-black border-2 border-rounded">Register</Link>
        <Link to="/login" className="font-inter font-medium  text-black px-4 py-2 rounded-md border border-black border-2 border-rounded">Login</Link>


      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginForm />} />



        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App