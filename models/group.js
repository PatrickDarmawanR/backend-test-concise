import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Group = sequelize.define('Group', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
});
