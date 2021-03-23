exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('users', function(table) { 
      table.increments('id'), // increments: `id int unsigned not null auto_increment primary key`
      table.string('username')
    }),
    knex.schema.createTable('conversations', function(table) { 
      table.increments('id'),
      table.string('name')
    }),
    knex.schema.createTable('messages', function(table) { 
      table.increments('id'),
      table.string('content'),
      table.timestamp('sent_at').defaultTo(knex.fn.now()),
      table.integer('userId').unsigned().notNullable(),
      table.integer('conversationId').unsigned().notNullable(),

      table.foreign('userId').references('id').inTable('users').onDelete('CASCADE'),
      table.foreign('conversationId').references('id').inTable('conversations').onDelete('CASCADE')
    }),
    knex.schema.createTable('conversation_members', function(table) { 
      table.increments('id'),
      table.integer('userId').unsigned().notNullable(),
      table.integer('conversationId').unsigned().notNullable(),
      
      table.foreign('userId').references('id').inTable('users').onDelete('CASCADE'),
      table.foreign('conversationId').references('id').inTable('conversations').onDelete('CASCADE')
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
