'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const usersQuery = await queryInterface.sequelize.query(
      'SELECT id FROM "Users";'
    );

    const driversQuery = await queryInterface.sequelize.query(
      'SELECT id FROM "Drivers";'
    );

    const users = usersQuery[0];
    const drivers = driversQuery[0];

    await queryInterface.bulkInsert('DayInfos', [
      {
        dateTime: new Date(),
        location: 'Amsterdam',
        value: 300,
        driverId: drivers[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dateTime: new Date(),
        value: 300.197,
        driverId: drivers[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        dateTime: new Date(),
        location: 'Antarctica',
        value: 100,
        driverId: drivers[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('DayInfos', null, {});
  }
};
