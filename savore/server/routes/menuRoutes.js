import express from 'express';
import MenuItem from '../modules/MenuItem.js';

const router = express.Router();

// GET: Fetch all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.findAll();
    res.status(200).json({ success: true, data: menuItems });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST: Add a menu item
router.post('/', async (req, res) => {
  try {
    const newItem = await MenuItem.create(req.body);
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE: Remove a menu item
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await MenuItem.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    res.status(200).json({ success: true, message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;