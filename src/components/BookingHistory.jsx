import React, { useEffect, useState } from 'react';
import { getBookingHistory } from '../api';
import { NavLink } from 'react-router-dom';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await getBookingHistory();
        setBookings(data.bookings);
      } catch (error) {
        console.error('Error fetching booking history:', error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="flex h-screen">
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
            to="/history"
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

    <div className='flex-1 bg-black  text-purple-300 p-6'>
      <h1 className="text-2xl font-bold">Your Booking History</h1>
      {bookings.length > 0 ? (
        <div className="mt-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="p-4 mb-4 border rounded shadow-sm bg-gray-100"
            >
              <h2 className="text-xl font-semibold">{booking.turfId.name}</h2>
              <p className="text-gray-700">
                Turf Name: {booking.turfId.turf_name}
              </p>
              <p className="text-gray-700">
                Location: {booking.turfId.turf_location}
              </p>
              <p className="text-gray-700">
                Date: {new Date(booking.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700">Time Slot: {booking.timeSlot}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 mt-4">No bookings found or You are not Logged in</p>
      )}
    </div>
    </div>
  );
};

export default BookingHistory;
