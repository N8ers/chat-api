'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.createTable('users', {
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
      }),
      await queryInterface.createTable('conversations', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }, {
        timestamps: true
      }),
      await queryInterface.createTable('messages', {
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
      }),
      await queryInterface.createTable('conversation_members', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        userId: {
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
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.dropTable('messages'),
      await queryInterface.dropTable('conversation_members'),
      await queryInterface.dropTable('conversations'),
      await queryInterface.dropTable('users')
    ])
  }
};
