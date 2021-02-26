'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      username: { 
        type: Sequelize.STRING, 
        allowNull: false 
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    }, {
      timestamps: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
  }
};
