const router = require('express').Router()
const knex = require('../config/config')


router.get('/init/:userId', async (req, res) => {
  const { userId } = req.params
  const conversations = await 
    knex.select('*')
      .from('conversation_members')
      .join('conversations', 'conversations.id', '=', 'conversation_members.conversationId')
      .where('conversation_members.userId', userId)
  
  res.json(conversations)
})

router.get('/selectConversation/:id', async (req, res) => {
  const { id } = req.params
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


  res.json(conversation)
})

module.exports = router;