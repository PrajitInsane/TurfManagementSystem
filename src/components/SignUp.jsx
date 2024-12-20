import React, { useState,useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';


const Signup = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const handleReset = () => {
    setName('');
    setEmail('');
    setPassword('');
  };


  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', { name, email, password });
      console.log(response.data);

      const token = response.data.token;
      signup(token); // Update auth state
      navigate('/profile'); 
    } catch (err) {
      console.error('Signup Error:', err);
      alert(err.response.data.message || 'Signup failed');
    }
  };

  return (
    <div className='h-screen w-full bg-black text-purple-300'>
      <h2 className='text-4xl pt-6 text-purple-900 font-bold flex justify-center'>Signup</h2>
      <form className='border p-10 mx-80 text-2xl mt-16' onSubmit={handleSignup}>
      <div className='flex justify-center gap-x-9'>
      <h1>Enter Your Name:</h1>
        <input className='w-80 rounded bg-purple-300 text-purple-900  placeholder-purple-900'
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        </div>
        <div className='flex justify-center gap-x-9 mt-9'>
          <h1>Enter your Email:</h1>
        <input className='w-80 rounded bg-purple-300 text-purple-900  placeholder-purple-900'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div>
        <div className='flex justify-center gap-x-9 mt-9'>
          <h1>Enter your Password:</h1>
        <input className='w-80 rounded bg-purple-300 text-purple-900  placeholder-purple-900'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
        <div className='flex justify-center gap-x-5 mt-9'>
        <button className='hover:bg-purple-900 bg-purple-800 w-24 rounded' type="submit">Signup</button>

        <button type="reset" onClick={handleReset} className='hover:bg-purple-900 bg-purple-800 w-24 rounded'>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
