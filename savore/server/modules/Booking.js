import { DataTypes } from 'sequelize';
import sequelize from './db.js';

const Booking = sequelize.define('Booking', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.STRING, allowNull: false },
  time: { type: DataTypes.STRING, allowNull: false },
  guests: { type: DataTypes.INTEGER, allowNull: false },
  specialRequests: { type: DataTypes.TEXT },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pending',
    validate: { isIn: [['Pending', 'Confirmed', 'Cancelled']] },
  },
});

export default Booking;