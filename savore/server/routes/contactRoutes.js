import express from 'express';
import Contact from '../modules/Contact.js';

const router = express.Router();

// POST: Submit contact message
router.post('/', async (req, res) => {
  try {
    const savedContact = await Contact.create(req.body);
    res.status(201).json({ success: true, message: 'Message sent successfully!', data: savedContact });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// GET: Fetch all contact messages (for admin)
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;