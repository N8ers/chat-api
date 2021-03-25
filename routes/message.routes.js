const router = require('express').Router()
const knex = require('../config/config')

const { } = require('../controllers/message.controller')
const { buildGenericRoutes } = require('./genericRouteBuilder');

// generic routes
const genericRoutesToBuild = ['GetAll', 'GetById', 'DeleteById']
const tableToQuery = 'messages'
buildGenericRoutes(genericRoutesToBuild, tableToQuery, router)

// get Messages by AuthorId
// router.get('/authorId', async (req, res) => {
// })

// get Messages by ConversationId
// router.get('/conversationId', async (req, res) => {
// })

// create Message
// router.post('/message', async (req, res) => {
// })

module.exports = router;