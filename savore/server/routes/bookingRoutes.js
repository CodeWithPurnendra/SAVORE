import express from 'express';
import Booking from '../modules/Booking.js';

const router = express.Router();

// POST: Create a table reservation
router.post('/', async (req, res) => {
  try {
    const savedBooking = await Booking.create(req.body);
    res.status(201).json({ success: true, message: 'Table booked successfully!', data: savedBooking });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// GET: Fetch all bookings (for admin dashboard)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PATCH: Update booking status (e.g., Confirmed, Cancelled)
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByPk(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();
    
    res.status(200).json({ success: true, message: 'Booking status updated', data: booking });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;