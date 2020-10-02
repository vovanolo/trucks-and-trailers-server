'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Drivers', 'companyId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      onDelete: 'SET NULL',
      references: {
        model: 'Companies',
        key: 'id',
      },
    });

    await queryInterface.addColumn('Trucks', 'companyId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      onDelete: 'SET NULL',
      references: {
        model: 'Companies',
        key: 'id',
      },
    });

    await queryInterface.addColumn('Trailers', 'companyId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      onDelete: 'SET NULL',
      references: {
        model: 'Companies',
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
