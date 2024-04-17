'use strict';
const {User, Movie} = require('../models/index.js');
const { faker } = require('@faker-js/faker');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let users = await User.findAll();
    for(let i=0; i<100; i++){
      await Movie.create({
        name: faker.lorem.words({ min: 1, max: 3 }),
        year: faker.number.int({ min: 1888, max: 2024 }),
        description: faker.lorem.paragraphs(5),
        UserId: users[faker.number.int({ max: users.length-1 })].id
      });
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Movies', null, {});
  }
};
