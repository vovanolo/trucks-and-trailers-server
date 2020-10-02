'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Companies', 'driverId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      onDelete: 'SET NULL',
      references: {
        model: 'Drivers',
        key: 'id',
      },
    });

    await queryInterface.addColumn('Companies', 'truckId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      onDelete: 'SET NULL',
      references: {
        model: 'Trucks',
        key: 'id',
      },
    });

    await queryInterface.addColumn('Companies', 'trailerId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      onDelete: 'SET NULL',
      references: {
        model: 'Trailers',
        key: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
