import React, { useState } from 'react';
import { login } from '../api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      console.log(response.data);

      // Store JWT token in localStorage
      localStorage.setItem('token', response.data.token);

      alert('Login successful!');
      // Redirect to the profile page
      window.location.href = '/profile';
    } catch (err) {
      console.error('Login Error:', err.response.data);
      alert('Invalid email or password');
    }
  };

  return (
    <div className='h-screen w-full bg-black text-purple-300'>
      <h2 className='text-4xl pt-6 text-purple-900 font-bold flex justify-center'>Login</h2>
      <form className='border p-3 mx-60 text-2xl mt-16' onSubmit={handleLogin}>
        <div className='flex justify-center gap-x-5'>
        <h1>Enter Your Email:</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /></div>
        <div className='flex justify-center gap-x-5 mt-4'>
            <h1>Enter your Password: </h1>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /></div>
        <div className='flex justify-center gap-x-5 mt-4'>
        <button type="submit" className='hover:bg-purple-900 bg-purple-800 w-24 rounded'>Login</button></div>
      </form>
    </div>
  );
};

export default Login;
