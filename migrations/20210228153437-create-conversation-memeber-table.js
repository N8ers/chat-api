'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('conversation_members', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      // I think the problem might be here, is the migration trying to create 'UserId'?
      memberId: {
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
    return queryInterface.dropTable('conversation_members')
  }
};
