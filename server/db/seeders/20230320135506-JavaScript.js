'use strict';

const texts = require('../../seeders');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert ('Texts', texts.map((el) => ({
      data: el.data, titile: el.titile, createdAt: new Date(), updatedAt: new Date(),
    })), {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
