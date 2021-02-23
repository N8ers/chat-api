const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const routes = {
  status: require('./status.routes')
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

module.exports = app;