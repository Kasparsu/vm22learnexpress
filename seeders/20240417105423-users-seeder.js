'use strict';
const {User} = require('../models/index.js');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.create({
      name: 'Kaspar Martin Suursalu',
      email: 'kasparsu@gmail.com',
      password: bcrypt.hashSync('password', 12)
    });

    for(let i = 0; i<10;i++){
      await User.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync('password', 12)
      });
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
