const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Make sure this path is correct!

const Plant = sequelize.define('Plant', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: true },
  isNew: { type: DataTypes.BOOLEAN, defaultValue: false },
  isEasyCare: { type: DataTypes.BOOLEAN, defaultValue: false }
});

module.exports = Plant;
