const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('plantdb', 'root', 'Miti205@', {
  host: '127.0.0.1',
  dialect: 'mysql'
});
module.exports = sequelize;
