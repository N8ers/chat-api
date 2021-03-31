const router = require('express').Router()
const knex = require('../config/config')
const { updateMessages } = require('../controllers/custom.controller')

const { } = require('../controllers/message.controller')
const { buildGenericRoutes } = require('../helpers/genericRouteBuilder')

// generic routes
const genericRoutesToBuild = ['GetAll', 'GetById', 'DeleteById']
const tableToQuery = 'messages'
buildGenericRoutes(genericRoutesToBuild, tableToQuery, router)

// get Messages by AuthorId
// router.get('/authorId', async (req, res) => {
// })

// get Messages by ConversationId
// router.get('/conversation_id', async (req, res) => {
// })

// create Message
router.post('/', async (req, res) => {
  const { content, user_id, conversation_id } = req.body
  const newMessage = await 
    knex('messages')
    .insert({ content, user_id, conversation_id }, ['id', 'sentAt'])
    .returning('*')
  const messages = await updateMessages(conversation_id)

  req.io.emit('messages', messages)
  res.json(newMessage)
})

module.exports = router;