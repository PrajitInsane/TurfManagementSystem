import axios from 'axios';

// Base URL of your backend API
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend server URL
});

// Automatically attach JWT token to requests if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token'); // Retrieve the JWT from localStorage
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


// Login API call
export const login = (email, password) => API.post('/users/login', { email, password });

// Signup API call
export const signup = (name, email, password) => API.post('/users/signup', { name, email, password });

// Fetch profile (protected route)
export const getProfile = () => API.get('/users/profile');

export const getTurfs= () => API.get('/turfs');

export const bookTurf = (bookingData) =>
  API.post('/bookings/book',bookingData); // Book a turf
export const getBookingHistory = () => API.get('/bookings/history');

export const cancelBooking = (bookingId) => API.delete(`/bookings/cancel/${bookingId}`);

export const getDeletedBookings = () => API.get('/bookings/delhistory');
