import React, { useEffect, useState } from 'react';
import { getDeletedBookings, cancelBooking } from '../api';
import { NavLink } from 'react-router-dom';


const CancelBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  // Fetch cancelable bookings on component mount
  useEffect(() => {
    const fetchCancelableBookings = async () => {
      try {
        const { data } = await getDeletedBookings();
        setBookings(data.cancelableBookings); // Set the filtered cancelable bookings
      } catch (error) {
        console.error('Error fetching cancelable bookings:', error.response?.data?.message || error.message);
      }
    };

    fetchCancelableBookings();
  }, []);

  // Handle cancel booking
  const handleCancel = async (bookingId) => {
    try {
      const { data } = await cancelBooking(bookingId);
      alert(data.message); // Display success message

      // Remove the canceled booking from the state
      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      console.error('Error canceling booking:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Failed to cancel booking.');
    }
  };

  return (
    <div className="flex h-auto">
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
            to="/cancel"
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
    <div className='flex-1 bg-black  text-purple-300 p-6 '>
      <h1 className="text-4xl font-bold text-purple-900 flex justify-center">Cancelable Bookings</h1>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking._id} className="p-4 mb-4 border rounded shadow-sm mt-4 flex justify-between bg-purple-900" >
            <div>
            <h3>Turf: {booking.turfId.turf_name}</h3>
            <p>Location: {booking.turfId.turf_location}</p>
            <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
            <p>Time Slot: {booking.timeSlot}</p>
            <p>Number of Players: {booking.numberOfPlayers}</p>
            <p>Price Paid: {booking.totalPrice}</p>
            </div>
            <div className='mt-6'>
            <button className='bg-purple-950 h-12 w-36 rounded ' onClick={() => handleCancel(booking._id)}>
              Cancel Booking
            </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-red-600 mt-4 text-3xl">No bookings available for cancellation or not Logged in</p>
      )}
    </div>
    </div>
  );
};

export default CancelBooking;
