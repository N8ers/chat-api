const router = require('express').Router()
const knex = require('../config/config')

router.get('/init/:user_id', async (req, res) => {
  const { user_id } = req.params
  const conversations = await 
    knex.select(
      'conversation_members.id',
      'users.id as friendId',
      'users.username as friendUsername',
      'conversations.name as conversationName',
      'conversations.id as conversationId'
      )
      .from('conversation_members')
      .join('conversations', 'conversations.id', '=', 'conversation_members.conversation_id')
      .join('users', 'users.id', '=', 'conversation_members.user_id')
      .whereNot('conversation_members.user_id', user_id)
  
  res.json(conversations)
})

router.get('/selectConversation/:id', async (req, res) => {
  const { id } = req.params
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

  res.json(conversation)
})

module.exports = router;
