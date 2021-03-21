
exports.seed = function(knex) {
  // Deletes ALL existing entries
  // return knex('table_name').del()
  return Promise.all([
    knex('conversation_members').del(),
    knex('conversations').del(),
    knex('messages').del(),
    knex('users').del()
  ])
    .then(function () {
      return Promise.all([
        knex('users').insert([
          { id: 5, username: 'Goon'  },
          { id: 4, username: 'Tsuki' },
          { id: 6, username: 'Joe'   },
          { id: 7, username: 'N8'    }
        ]),
        knex('conversations').insert([
          { id: 1 },
          { id: 2 },
          { id: 3 },
        ]),
        knex('conversation_members').insert([
          { id: 1, userId: 7, conversationId: 1 },
          { id: 2, userId: 4, conversationId: 1 },
          { id: 3, userId: 7, conversationId: 2 },
          { id: 4, userId: 5, conversationId: 2 },
          { id: 5, userId: 7, conversationId: 3 },
          { id: 6, userId: 6, conversationId: 3 }
        ]),
        knex('messages').insert([
          { id: 1, userId: 4, conversationId: 1, content: 'Meow!'       },
          { id: 2, userId: 7, conversationId: 1, content: 'Hi, Tsuki'   },
          { id: 3, userId: 5, conversationId: 2, content: 'Hi, Honey'   },
          { id: 4, userId: 7, conversationId: 2, content: 'Hello, bean' },
          { id: 5, userId: 6, conversationId: 3, content: 'Sup bro'     },
          { id: 6, userId: 7, conversationId: 3, content: 'Hi, Joe'     },
        ]),
      ])
    });
};
