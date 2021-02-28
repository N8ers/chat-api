const router = require('express').Router()

const { 
  getAllConversations, 
  getConversation, 
  createConversation, 
  deleteConversation 
} = require('../controllers/conversation.controller')

// get Conversations
router.get('/conversations', async (req, res) => {
  let conversations = await getAllConversations()
  res.send(conversations)
})

// get Conversation by id
router.get('/conversation', async (req, res) => {
  let conversation = await getConversation(req)
  res.send(conversation)
})

// create Conversation
router.post('/conversation', async (req, res) => {
  let conversation = await createConversation(req)
  res.send({ conversation })
})

// delete Conversation by id
router.delete('/conversation', async (req, res) => { 
  let conversation = await deleteConversation(req)
  res.send({ conversation })
})

module.exports = router;