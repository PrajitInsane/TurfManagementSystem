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
    <div>
      <h2>User Profile</h2>
      {profile ? (
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
