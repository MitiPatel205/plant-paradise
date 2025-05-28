'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Plants', 'careLevel', { type: Sequelize.STRING });
    await queryInterface.addColumn('Plants', 'light', { type: Sequelize.STRING });
    await queryInterface.addColumn('Plants', 'petFriendly', { type: Sequelize.BOOLEAN, defaultValue: false });
    await queryInterface.addColumn('Plants', 'shortDescription', { type: Sequelize.STRING });
    await queryInterface.addColumn('Plants', 'whyTrending', { type: Sequelize.STRING });
    await queryInterface.addColumn('Plants', 'likes', { type: Sequelize.INTEGER, defaultValue: 0 });
    await queryInterface.addColumn('Plants', 'shares', { type: Sequelize.INTEGER, defaultValue: 0 });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Plants', 'careLevel');
    await queryInterface.removeColumn('Plants', 'light');
    await queryInterface.removeColumn('Plants', 'petFriendly');
    await queryInterface.removeColumn('Plants', 'shortDescription');
    await queryInterface.removeColumn('Plants', 'whyTrending');
    await queryInterface.removeColumn('Plants', 'likes');
    await queryInterface.removeColumn('Plants', 'shares');
  }
};
