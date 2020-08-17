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

    await queryInterface.bulkInsert('Trucks', [
      {
        name: 'Truck_1',
        comment: 'Foo bar',
        rate: 100.1,
        ownedByCompany: false,
        driverId: drivers[0].id,
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Truck_2',
        comment: 'Foo bar',
        rate: 100.2,
        ownedByCompany: false,
        driverId: drivers[0].id,
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Truck_3',
        comment: 'Foo bar',
        rate: 100.3,
        ownedByCompany: true,
        driverId: drivers[0].id,
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Truck_4',
        comment: 'Foo bar',
        rate: 100.4,
        ownedByCompany: false,
        driverId: drivers[1].id,
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Truck_5',
        comment: 'Foo bar',
        rate: 100.5,
        ownedByCompany: true,
        driverId: drivers[2].id,
        userId: users[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Truck_6',
        comment: 'Foo bar',
        rate: 100.5,
        ownedByCompany: true,
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Truck_7',
        comment: 'Foo bar',
        rate: 100.5,
        ownedByCompany: true,
        userId: users[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Truck_8',
        comment: 'Foo bar',
        rate: 100.5,
        ownedByCompany: true,
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
    await queryInterface.bulkDelete('Trucks', null, {});
  }
};
