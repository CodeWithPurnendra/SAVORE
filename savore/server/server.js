import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import sequelize from './modules/db.js';

// Import Models explicitly from the './modules/' folder with .js extension
import User from './modules/User.js';
import Booking from './modules/Booking.js';
import { Order, OrderItem } from './modules/Order.js';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const app = express();

// Define Database Associations cleanly before sync
User.hasMany(Booking, { foreignKey: 'userId', onDelete: 'CASCADE' });
Booking.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Order, { foreignKey: 'userId', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'SAVORÉ API is running smoothly' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/orders', orderRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

// Database Connection & Server Startup
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connection established successfully.');

    // Sync models to PostgreSQL tables
    await sequelize.sync({ alter: true });
    console.log('PostgreSQL models synced successfully.');

    app.listen(PORT, () => {
      console.log(`🚀 SAVORÉ Backend Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Database connection/sync failed:', err.message);
    process.exit(1);
  }
};

startServer();