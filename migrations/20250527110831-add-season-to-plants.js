'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Plants', 'season', {
      type: Sequelize.STRING,
      allowNull: true, // or false if you want it required
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Plants', 'season');
  }
};
