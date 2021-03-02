const router = require('express').Router()

const { createConversationMember } = require('../controllers/conversationMember.controller')

// get allConversationMembers
router.get('/conversationMembers', async (req, res) => { })

// get allConversationsByMember
router.get('/', async (req, res) => { })

// get allMembersByConversation
router.get('/', async (req, res) => { })

// create memberConversation
// this is confusing, but it adds userId to conversation (basically)
router.post('/conversationMember', async (req, res) => {
  let conversationMember = await createConversationMember(req)
  res.send({ conversationMember })
})

// delete memberConversation
// removes member from conversation

module.exports = router;