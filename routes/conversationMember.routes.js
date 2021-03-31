const router = require('express').Router()
const knex = require('../config/config')

const { } = require('../controllers/conversationMember.controller')
const { buildGenericRoutes } = require('../helpers/genericRouteBuilder');

// generic routes
const genericRoutesToBuild = ['GetAll', 'GetById', 'DeleteById']
const tableToQuery = 'conversation_members'
buildGenericRoutes(genericRoutesToBuild, tableToQuery, router)


// create MemberConversation
router.post('/', async (req, res) => {
  const { user_id, conversation_id } = req.body
  const newConversationMember = await knex('conversation_members').insert({ user_id, conversation_id }, ['id']).returning('*')
  res.json(newConversationMember)
})

module.exports = router;