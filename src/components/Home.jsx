import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-purple-950 text-purple-300 ${
          isOpen ? 'w-64' : 'w-16'
        } transition-width duration-300 flex flex-col`}
      >
        <button
          className="text-purple-300 m-4 hover:text-white"
          onClick={toggleSidebar}
        >
          {isOpen ? 'Close' : 'Open'}
        </button>

        <nav className="mt-10 flex flex-col gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'bg-purple-700 px-4 py-2 rounded-md'
                : 'hover:bg-purple-700 px-4 py-2 rounded-md'
            }
          >
            Book Your  Turf
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? 'bg-purple-700 px-4 py-2 rounded-md'
                : 'hover:bg-purple-700 px-4 py-2 rounded-md'
            }
          >
            Cancellation
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? 'bg-purple-700 px-4 py-2 rounded-md'
                : 'hover:bg-purple-700 px-4 py-2 rounded-md'
            }
          >
            View Bookings
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-black  text-purple-300 p-6">
      <h2 className='text-4xl pt-6 text-purple-900 font-bold flex justify-center'>Welcome to BookTurf</h2>
      <h2 className='text-3xl pt-6 text-purple-900 font-bold flex justify-center'>Booking made easy</h2>
        
            
      </div>
    </div>
  );
};

export default Home;
