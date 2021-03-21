exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('users', function(table) { 
      table.increments('id')
      table.string('username')
    }),
    knex.schema.createTable('conversations', function(table) { 
      table.increments('id')
    }),
    knex.schema.createTable('messages', function(table) { 
      table.increments('id'),
      table.string('content'),
      table.integer('userId').references('id').inTable('users'),
      table.integer('conversationId').references('id').inTable('conversations'),
      table.timestamp('sent_at').defaultTo(knex.fn.now())
    }),
    knex.schema.createTable('conversation_members', function(table) { 
      table.increments('id'),
      table.integer('userId').references('id').inTable('users'),
      table.integer('conversationId').references('id').inTable('conversations')
    })
  ])
};

exports.down = function(knex) {
  // return Promise.all([
  //   knex.schema.dropTable('messages'),
  //   knex.schema.dropTable('conversation_members'),
  //   knex.schema.dropTable('conversations'),
  //   knex.schema.dropTable('users')
  // ])
};
