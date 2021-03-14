'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.bulkInsert('users', [
        { id: 5, username: 'Goon'  },
        { id: 4, username: 'Tsuki' },
        { id: 6, username: 'Joe'   },
        { id: 7, username: 'N8'    }
      ], {}),
      await queryInterface.bulkInsert('conversations', [
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ], {}),
      await queryInterface.bulkInsert('conversation_members', [
        { id: 1, userId: 7, conversationId: 1 },
        { id: 2, userId: 4, conversationId: 1 },
        { id: 3, userId: 7, conversationId: 2 },
        { id: 4, userId: 5, conversationId: 2 },
        { id: 5, userId: 7, conversationId: 3 },
        { id: 6, userId: 6, conversationId: 3 }
      ], {}),
      await queryInterface.bulkInsert('messages', [
        { id: 1, authorId: 4, conversationId: 1, content: 'Meow!'       },
        { id: 2, authorId: 7, conversationId: 1, content: 'Hi, Tsuki'   },
        { id: 3, authorId: 5, conversationId: 2, content: 'Hi, Honey'   },
        { id: 4, authorId: 7, conversationId: 2, content: 'Hello, bean' },
        { id: 5, authorId: 6, conversationId: 3, content: 'Sup bro'     },
        { id: 6, authorId: 7, conversationId: 3, content: 'Hi, Joe'     },
      ], {}),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.bulkDelete('users', null, {}),
      await queryInterface.bulkDelete('conversations', null, {}),
      await queryInterface.bulkDelete('messages', null, {}),
      await queryInterface.bulkDelete('conversation_members', null, {})
    ]);
  }
};
