const router = require('express').Router()

const { 
  createConversationMember, 
  getAllConversationMembers, 
  getAllConversationMembersByMember,
  getAllConversationMembersByConversation,
  deleteConversationMember 
} = require('../controllers/conversationMember.controller')

// get allConversationMembers
router.get('/conversationMembers', async (req, res) => { 
  let conversationMembers = await getAllConversationMembers()
  res.send({ conversationMembers })
})

// get allConversationsByMember
router.get('/conversationMembersByUserId', async (req, res) => {
  let conversationMembers = await getAllConversationMembersByMember(req)
  res.send({ conversationMembers })
})

// get allMembersByConversation
router.get('/conversationMembersByConversationId', async (req, res) => { 
  let conversationMembers = await getAllConversationMembersByConversation(req)
  res.send({ conversationMembers })
})

// create memberConversation
// this is confusing, but it adds userId to conversation (basically)
router.post('/conversationMember', async (req, res) => {
  let conversationMember = await createConversationMember(req)
  res.send({ conversationMember })
})

// delete memberConversation
// removes member from conversation
router.delete('/conversationMember', async (req, res) => {
  let conversationMember = await deleteConversationMember(req)
  res.send({ conversationMember })
})

module.exports = router;