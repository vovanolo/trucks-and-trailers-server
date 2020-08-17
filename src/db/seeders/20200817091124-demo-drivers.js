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

    const users = usersQuery[0];

    await queryInterface.bulkInsert('Drivers', [
      {
        firstName: 'John',
        lastName: 'Doe',
        comment: 'Foo bar',
        rate: 1000.7,
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Good',
        lastName: 'Volodya',
        comment: 'Foo bar',
        rate: 10000000.195000738,
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Good',
        lastName: 'Oleh',
        comment: 'Foo bar',
        rate: 90.9,
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
    await queryInterface.bulkDelete('Drivers', null, {});
  }
};
