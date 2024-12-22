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

module.exports = router;
