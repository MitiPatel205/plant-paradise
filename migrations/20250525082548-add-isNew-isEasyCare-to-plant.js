'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add isNew column
    await queryInterface.addColumn('Plants', 'isNew', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
    // Add isEasyCare column
    await queryInterface.addColumn('Plants', 'isEasyCare', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
    // Add isTrending column
    await queryInterface.addColumn('Plants', 'isTrending', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove isTrending column
    await queryInterface.removeColumn('Plants', 'isTrending');
    // Remove isEasyCare column
    await queryInterface.removeColumn('Plants', 'isEasyCare');
    // Remove isNew column
    await queryInterface.removeColumn('Plants', 'isNew');
  }
};
