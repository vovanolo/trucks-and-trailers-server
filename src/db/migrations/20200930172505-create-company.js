'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      driverId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'SET NULL',
        references: {
          model: 'Drivers',
          key: 'id',
        },
      },
      truckId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'SET NULL',
        references: {
          model: 'Trucks',
          key: 'id',
        },
      },
      trailerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'SET NULL',
        references: {
          model: 'Trailers',
          key: 'id',
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Companies');
  },
};
