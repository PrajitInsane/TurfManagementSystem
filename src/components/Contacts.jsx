import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Cards';

const Contacts = () => {
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch data using axios
    const fetchTurfs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/turfs'); // Replace with your API endpoint
        setTurfs(response.data); // Assuming API response is an array of turfs
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTurfs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='h-auto px-10 bg-black text-purple-300 pb-10'>
      <h1 className="text-4xl font-semibold flex justify-center pt-6 text-purple-900">Contact Our Turfs</h1>
      <div className='p-4 mt-12 h-auto flex flex-col gap-y-16 '>
        {turfs.map((turf) => (
          <Card
            image={turf.turf_image}
            key={turf._id} // Use a unique key
            name={turf.turf_name}
            location={turf.turf_location}
            contact={turf.turf_contact}
            email={turf.turf_email}
          />
        ))}
      </div>
    </div>
  );
};

export default Contacts;
