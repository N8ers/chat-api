'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('messages', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      content: { type: Sequelize.STRING, allowNull: false },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      authorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: 'users' },
          key: 'id',
        }
      },
      conversationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: 'conversations' },
          key: 'id'
        }
      }
    }, {
      timestamps: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('messages')
  }
};
