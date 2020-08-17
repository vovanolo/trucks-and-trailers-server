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

    await queryInterface.bulkInsert('Trailers', [
      {
        name: 'Trailer_1',
        comment: 'Foo bar',
        driverId: drivers[0].id,
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Trailer_2',
        comment: 'Foo bar',
        driverId: drivers[0].id,
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Trailer_3',
        comment: 'Foo bar',
        driverId: drivers[0].id,
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Trailer_4',
        comment: 'Foo bar',
        driverId: drivers[1].id,
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Trailer_5',
        comment: 'Foo bar',
        driverId: drivers[2].id,
        userId: users[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Trailer_6',
        comment: 'Foo bar',
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Trailer_7',
        comment: 'Foo bar',
        userId: users[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Trailer_8',
        comment: 'Foo bar',
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Trailers', null, {});
  }
};
