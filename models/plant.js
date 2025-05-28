const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // This path is correct

const Plant = sequelize.define('Plant', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  image: { type: DataTypes.STRING, allowNull: true },
  isNew: { type: DataTypes.BOOLEAN, defaultValue: false },
  isEasyCare: { type: DataTypes.BOOLEAN, defaultValue: false },
  isTrending: { type: DataTypes.BOOLEAN, defaultValue: false },
  season: { type: DataTypes.STRING, allowNull: true },
  isPlantOfWeek: { type: DataTypes.BOOLEAN, defaultValue: false },
  careLevel: { type: DataTypes.STRING, allowNull: true },
  light: { type: DataTypes.STRING, allowNull: true },
  petFriendly: { type: DataTypes.BOOLEAN, allowNull: true },
  shortDescription: { type: DataTypes.STRING, allowNull: true },
  whyTrending: { type: DataTypes.STRING, allowNull: true },
  likes: { type: DataTypes.INTEGER, allowNull: true },
  shares: { type: DataTypes.INTEGER, allowNull: true }
}, {
  tableName: 'Plants', // Make sure this matches your MySQL table name (case-sensitive!)
  timestamps: true
});

module.exports = Plant;
