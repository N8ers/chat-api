const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const routes = {
  status: require('./status.routes'),
  knexCheck: require('./knex.routes'),
  genericRoute: require('./generic.routes')
  // user: require('./user.routes'),
  // conversation: require('./conversation.routes'),
  // message: require('./message.routes'),
  // conversationMember: require('./conversationMember.routes')
}

let app = express()

app.use(bodyParser.json())
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  })
)

app.use('/status', routes.status)
app.use('/knex', routes.knexCheck)
app.use('/generic', routes.genericRoute)
// app.use('/user', routes.user)
// app.use('/conversation', routes.conversation)
// app.use('/message', routes.message)
// app.use('/conversationMember', routes.conversationMember)


module.exports = app;