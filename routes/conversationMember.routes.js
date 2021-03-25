const router = require('express').Router()
const knex = require('../config/config')

const { } = require('../controllers/conversationMember.controller')
const { buildGenericRoutes } = require('./genericRouteBuilder');

// generic routes
const genericRoutesToBuild = ['GetAll', 'GetById', 'DeleteById']
const tableToQuery = 'conversation_members'
buildGenericRoutes(genericRoutesToBuild, tableToQuery, router)


// create MemberConversation
// router.post('/conversationMember', async (req, res) => {
// })

module.exports = router;