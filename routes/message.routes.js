const router = require('express').Router()

const { } = require('../controllers/message.controller')

// get Messages
router.get('/messages', async (req, res) => {
  let messages = await getAllMessages()
  res.send(messages)
})

// get Messages by MessageId
router.get('/messageId', async (req, res) => {
  let message = await getAllMessagesById(req)
  res.send(message)
})

// get Messages by AuthorId
router.get('/authorId', async (req, res) => {
  let message = await getAllMessagesByAuthorId(req)
  res.send(message)
})

// get Messages by ConversationId
router.get('/conversationId', async (req, res) => {
  let message = await getAllMessagesByConversationId(req)
  res.send(message)
})

// create Message
router.post('/message', async (req, res) => {
  let result = await createMessage(req)
  res.send({ message: result })
})

// delete Message by id
router.delete('/message', async (req, res) => { 
  let result = await deleteMessageById(req)
  res.send({ message: result })
})

module.exports = router;