const knex = require('../config/config')

async function updateMessages (id) {
  const conversation = await
    knex.select(
      'messages.id', 
      'messages.content', 
      'messages.sent_at',
      'messages.conversation_id', 
      'messages.user_id',
      'users.username'
      )
      .from('messages')
      .where('messages.conversation_id', id)
      .join('users', 'users.id', '=', 'messages.user_id')
      .orderBy('messages.sent_at')
  return conversation
}

module.exports = {
  updateMessages
}