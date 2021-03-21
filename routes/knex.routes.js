const router = require('express').Router()
const knex = require('../config/config')

router.get('/users', async (req, res) => {
  const users = await knex.select().from('users');
  res.send(users)
})

router.get('/messages', async (req, res) => {
  const messages = await knex.select().from('messages');
  res.send(messages)
})

router.get('/conversations', async (req, res) => {
  const conversations = await knex.select().from('conversations');
  res.send(conversations)
})

router.get('/conversationMembers', async (req, res) => {
  const conversationMembers = await knex.select().from('conversation_members');
  res.send(conversationMembers)
})

module.exports = router;