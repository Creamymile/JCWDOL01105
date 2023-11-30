module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "reset_password_token", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Users", "reset_password_expires", {
      type: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "reset_password_token");
    await queryInterface.removeColumn("Users", "reset_password_expires");
  },
};
