const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const routes = {
  user: require('./user.routes'),
  custom: require('./custom.routes'),
  status: require('./status.routes'),
  message: require('./message.routes'),
  conversation: require('./conversation.routes'),
  conversationMember: require('./conversationMember.routes')
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

app.use('/users', routes.user)
app.use('/status', routes.status)
app.use('/custom', routes.custom)
app.use('/messages', routes.message)
app.use('/conversations', routes.conversation)
app.use('/conversation_members', routes.conversationMember)


module.exports = app;