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
        date: new Date().toDateString(),
        time: new Date().getTime(),
        location: 'Amsterdam',
        value: 300,
        driverId: drivers[0].id,
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        date: new Date().toDateString(),
        time: new Date().getTime(),
        value: 300.197,
        driverId: drivers[1].id,
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        date: new Date().toDateString(),
        time: new Date().getTime(),
        location: 'Antarctica',
        value: 100,
        driverId: drivers[1].id,
        userId: users[1].id,
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
