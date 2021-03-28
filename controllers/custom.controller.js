const knex = require('../config/config')

async function updateMessages (id) {
  const conversation = await
    knex.select(
      'messages.id', 
      'messages.content', 
      'messages.sent_at',
      'messages.conversationId', 
      'messages.userId',
      'users.username'
      )
      .from('messages')
      .where('messages.conversationId', id)
      .join('users', 'users.id', '=', 'messages.userId')
      .orderBy('messages.sent_at')
  return conversation
}

module.exports = {
  updateMessages
}