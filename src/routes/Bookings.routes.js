const express = require('express');
const router = express.Router();
const Booking = require('../models/Bookings.model');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcryptjs');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });
  
    try {
      const verified = jwt.verify(token,'12345');
      req.user = verified; // Attach user data to request object
      next();
    } catch (err) {
      res.status(400).json({ message: 'Invalid token' });
    }
  };

// POST: Book a turf
router.post('/book', authenticate, async (req, res) => {
  try {
    const { turfId, date, timeSlot } = req.body;
    const userId = req.user.id;

    // Ensure no overlapping bookings
    const existingBooking = await Booking.findOne({ turfId, date, timeSlot });
    if (existingBooking) {
      return res.status(400).json({ message: 'Time slot already booked!' });
    }

    // Create booking
    const newBooking = new Booking({ userId, turfId, date, timeSlot });
    await newBooking.save();

    res.status(201).json({ message: 'Booking successful', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

router.get('/history', authenticate, async (req, res) => {
    try {
      const userId = req.user.id;
  
      // Fetch bookings with populated turf details
      const bookings = await Booking.find({ userId })
        .populate('turfId', 'turf_name turf_location') // Populate 'name' and 'location' fields from Turf model
        .sort({ date: -1 }); // Sort by date (latest first)
      
      res.json({ bookings });
    } catch (error) {
        console.error('Error fetching bookings:', error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  });

  router.get('/delhistory', authenticate, async (req, res) => {
    try {
      const now = new Date();
  
      const bookings = await Booking.find({ userId: req.user.id }).populate('turfId', 'turf_name turf_location');
  
      // Filter bookings that can still be canceled
      const cancelableBookings = bookings.filter((booking) => {
        const bookingDateTime = new Date(booking.date); // Parse the booking date
  const [startTime] = booking.timeSlot.split('-'); // Extract start time ("9:00 ")
  const [startHour, startMinutes] = startTime.trim().split(':').map(Number); // Split into hours and minutes

  bookingDateTime.setHours(startHour, startMinutes, 0, 0);
  return now < bookingDateTime; // Only include bookings where the current time is before the time slot
      });
  
      res.status(200).json({cancelableBookings});
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ message: 'Internal Server Error.' });
    }
  });


router.delete('/cancel/:id',authenticate,async(req,res)=>{
  const bookingId = req.params.id;

  try {
    // Find the booking
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    // Ensure the booking belongs to the logged-in user
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to cancel this booking.' });
    }

    // Check if the booking can still be canceled
    const now = new Date();
    const bookingDateTime = new Date(booking.date);
    const [startHour, endHour] = booking.timeSlot.split('-').map((time) => parseInt(time));

    // Combine the booking date with the start hour
    bookingDateTime.setHours(startHour, 0, 0, 0);

    if (now >= bookingDateTime) {
      return res.status(400).json({ message: 'You can only cancel bookings before the time slot starts.' });
    }

    // Delete the booking
    await Booking.findByIdAndDelete(bookingId);

    res.status(200).json({ message: 'Booking canceled successfully.' });
  } catch (error) {
    console.error('Error canceling booking:', error);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
});

module.exports = router;
