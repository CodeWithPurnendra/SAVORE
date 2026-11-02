import express from 'express';
import Booking from '../modules/Booking.js';

const router = express.Router();

// POST /api/bookings  ->  create a reservation
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, guests, date, time, specialRequests } = req.body;

    // Required fields
    if (!name || !email || !phone || !guests || !date || !time) {
      return res
        .status(400)
        .json({ success: false, error: 'Please fill in all required fields.' });
    }

    // Guests must be a positive number
    const guestCount = parseInt(guests, 10);
    if (Number.isNaN(guestCount) || guestCount < 1) {
      return res
        .status(400)
        .json({ success: false, error: 'Number of guests must be at least 1.' });
    }

    // Date must be valid and not in the past (date is "YYYY-MM-DD")
    const bookingDate = new Date(`${date}T00:00:00`);
    if (Number.isNaN(bookingDate.getTime())) {
      return res
        .status(400)
        .json({ success: false, error: 'Please choose a valid date.' });
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (bookingDate < today) {
      return res
        .status(400)
        .json({ success: false, error: 'Booking date cannot be in the past.' });
    }

    const booking = await Booking.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      guests: guestCount,
      date,
      time,
      specialRequests: specialRequests ? specialRequests.trim() : null,
    });

    return res.status(201).json({ success: true, booking });
  } catch (err) {
    console.error('Booking error:', err);
    return res
      .status(500)
      .json({ success: false, error: 'Failed to create booking. Please try again.' });
  }
});

export default router;