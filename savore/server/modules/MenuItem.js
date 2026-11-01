import { DataTypes } from 'sequelize';
import sequelize from './db.js';

const MenuItem = sequelize.define('MenuItem', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  category: { type: DataTypes.ENUM('Starters', 'Mains', 'Desserts', 'Beverages'), allowNull: false },
  image: { type: DataTypes.STRING },
  isAvailable: { type: DataTypes.BOOLEAN, defaultValue: true }
});

export default MenuItem;