'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('role', [{ id: 1, role: 'admin', createdAt: '2021-08-19T10:51:39.595Z', updatedAt: '2021-08-19T10:51:39.595Z' }, { id: 2, role: 'admin-client', createdAt: '2021-08-19T10:51:39.595Z', updatedAt: '2021-08-19T10:51:39.595Z' }, { id: 3, role: 'client', createdAt: '2021-08-19T10:51:39.595Z', updatedAt: '2021-08-19T10:51:39.595Z' }], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('role', null, {});

  }
};
