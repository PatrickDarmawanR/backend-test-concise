import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Task = sequelize.define('Task', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
  },
});
