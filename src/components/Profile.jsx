import React, { useEffect, useState } from 'react';
import { getProfile } from '../api';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data);
      } catch (err) {
        console.error('Error fetching profile:', err.response.data);
        alert('Session expired. Please login again.');
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className='h-screen w-full bg-black text-purple-300'>
      <h2 className='text-4xl pt-6 text-purple-900 font-bold flex justify-center'>User Profile</h2>
      {profile ? (
        <div className='border p-10 mx-80 mt-16 text-3xl'>
          <p className='mt-3'>Name:  {profile.name}</p>
          <p className='mt-3'>Email: {profile.email}</p>
          <p className='mt-3'>Account CreatedAt: {profile.createdAt}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
