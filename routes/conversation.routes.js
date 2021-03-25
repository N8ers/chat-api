const router = require('express').Router()
const knex = require('../config/config')

const { } = require('../controllers/conversation.controller')
const { buildGenericRoutes } = require('./genericRouteBuilder');

// generic routes
const genericRoutesToBuild = ['GetAll', 'GetById', 'DeleteById']
const tableToQuery = 'conversations'
buildGenericRoutes(genericRoutesToBuild, tableToQuery, router)

// create Conversation
router.post('/', async (req, res) => {
  // make this controller at some point
  const { name } = req.body
  const newConversation = await knex('conversations').insert({ name }, ['id']).returning('*')
  res.json(newConversation)
})

// edit Conversation name
router.put('/', async (req, res) => {
  const { id, name } = req.body
  const modifiedConversation = await knex.select('id').from('conversations').where({ id }).update({ name }).returning('*')
  res.json(modifiedConversation)
})

module.exports = router;