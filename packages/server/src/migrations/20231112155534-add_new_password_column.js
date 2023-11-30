'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'new_password', {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        len: [6],
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'new_password');
  },
};
