import express from 'express';
import { Order, OrderItem } from '../modules/Order.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected Route: Only authenticated users can place an order
router.post('/', verifyToken, async (req, res) => {
  try {
    const { items, totalAmount, deliveryAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Create the primary order entry
    const order = await Order.create({
      userId: req.user.id,
      totalAmount,
      deliveryAddress,
      paymentMethod: paymentMethod || 'Cash on Delivery',
    });

    // Create order items
    const orderItems = items.map((item) => ({
      orderId: order.id,
      itemName: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    await OrderItem.bulkCreate(orderItems);

    res.status(201).json({ message: 'Order placed successfully!', orderId: order.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;