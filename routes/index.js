const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const routes = {
  status: require('./status.routes'),
  user: require('./user.routes'),
  conversation: require('./conversation.routes'),
  // message: require('./message.routes'),
  // conversationMember: require('./conversationMember.routes')
}

let app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  })
)

app.use('/status', routes.status)
app.use('/users', routes.user)
app.use('/conversations', routes.conversation)
// app.use('/messages', routes.message)
// app.use('/conversation_members', routes.conversationMember)


module.exports = app;