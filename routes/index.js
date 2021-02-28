const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const routes = {
  status: require('./status.routes'),
  user: require('./user.routes'),
  conversation: require('./conversation.routes')
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
app.use('/user', routes.user)
app.use('/conversation', routes.conversation)


module.exports = app;