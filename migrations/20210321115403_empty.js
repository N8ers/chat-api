
exports.up = function(knex) {
  return Promise.all([
    knex.schema.dropTable('messages'),
    knex.schema.dropTable('conversation_members'),
    knex.schema.dropTable('conversations'),
    knex.schema.dropTable('users')
  ])
};

exports.down = function(knex) {
  
};
