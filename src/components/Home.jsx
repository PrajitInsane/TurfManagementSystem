import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { bookTurf, getTurfs } from '../api';
import { NavLink } from 'react-router-dom';
// API functions for booking and fetching turfs

const BookingPage = () => {
  const [selectedTurf, setSelectedTurf] = useState('');
  const [turfs, setTurfs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedNumberOfPlayers, setSelectedNumberOfPlayers] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [razorpay, setRazorpay] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  // Generate time slots (9 AM to 6 PM)
  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const startTime = moment({ hour: 9 }).add(i, 'hours').format('HH:00');
    const endTime = moment({ hour: 9 }).add(i + 1, 'hours').format('HH:00');
    return `${startTime} - ${endTime}`;
  });

  // Fetch turfs on component mount
  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const { data } = await getTurfs(); // Fetch turfs from API
        setTurfs(data);
      } catch (error) {
        console.error('Error fetching turfs:', error.response?.data?.message || error.message);
      }
    };
    fetchTurfs();
  }, []);

  const handleBooking = async () => {
    if (!selectedTurf || !selectedDate || !selectedTimeSlot || !selectedNumberOfPlayers) {
      alert('Please select a turf, date, time slot, and number of players!');
      return;
    }

    try {
      setIsBooking(true);
            const bookingData = {
              turfId: selectedTurf,
              date: selectedDate,
              timeSlot: selectedTimeSlot,
              numberOfPlayers: selectedNumberOfPlayers,
            };
            const { data } = await bookTurf(bookingData); // Book a turf
            alert(data.message);
        
     
    } catch (error) {
      console.error('Error booking slot:', error.response?.data?.message || error.message);
-      alert(error.response?.data?.message || 'Failed to book slot.');

    } finally {
      setIsBooking(false);
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
    <div className='flex-1 bg-black text-purple-900 p-6'>
      <h1 className="text-4xl font-bold flex justify-center">Welcome To BookTurf</h1>
      <h1 className='text-3xl font-bold  flex justify-center mt-2'>Booking made easy</h1>
    <div className="p-6 max-w-lg mx-auto bg-purple-900 text-purple-300 rounded shadow mt-4">
      <h1 className="text-2xl font-semibold mb-6">Book Your Turf Slot</h1>

      {/* Turf Selection */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Select a Turf:</label>
        <select
          value={selectedTurf}
          onChange={(e) => setSelectedTurf(e.target.value)}
          className="border rounded px-4 py-2 w-full bg-black"
          calendarClassName="custom-calendar"
        >
          <option value="">Select a turf</option>
          {turfs.map((turf) => (
            <option key={turf._id} value={turf._id}>
              {turf.turf_name} - {turf.turf_location}
            </option>
          ))}
        </select>
      </div>

      {/* Date Selection */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Choose a Date:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date()} // Disable past dates
          placeholderText="Select a date"
          className="border rounded px-4 py-2 bg-black"
        />
      </div>

      {/* Time Slot Selection */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Choose a Time Slot:</label>
        <select
          value={selectedTimeSlot}
          onChange={(e) => setSelectedTimeSlot(e.target.value)}
          className="border rounded px-4 py-2 w-full bg-black"
        >
          <option value="">Select a time slot</option>
          {timeSlots.map((slot, index) => (
            <option key={index} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Choose a Time Slot:</label>
        <select
          value={selectedNumberOfPlayers}
          onChange={(e) => setSelectedNumberOfPlayers(e.target.value)}
          className="border rounded px-4 py-2 w-full bg-black"
        >
         <option value="">Select number of players</option>
        {[...Array(9).keys()].map((i) => {
          const players = i + 8; // Generates numbers from 8 to 16
          return (
            <option key={players} value={players}>
              {players}
            </option>
          );
})}
        </select>
      </div>

      {/* Booking Button */}
      <button
        onClick={handleBooking}
        disabled={isBooking}
        className={`px-6 py-2 rounded text-white ${
          isBooking ? 'bg-gray-400' : 'bg-purple-500 hover:bg-purple-600'
        }`}
      >
        {isBooking ? 'Booking...' : 'Book Now'}
      </button>
    </div>
    </div>
    </div>
  );
};

export default BookingPage;
