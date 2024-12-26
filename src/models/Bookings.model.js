const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    turfId: { type: mongoose.Schema.Types.ObjectId, ref: 'Turf', required: true }, // Reference to Turf
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
    date: { type: Date, required: true }, // Booking Date
    timeSlot: { type: String, required: true }, 
    numberOfPlayers: { type: Number, required: true }, // Number of players in the booking
    totalPrice: { type: Number, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);



module.exports = mongoose.model('Booking', BookingSchema);
