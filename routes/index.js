const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const socketio = require('socket.io')

const { updateMessages } = require('../controllers/custom.controller')

const routes = {
  user: require('./user.routes'),
  custom: require('./custom.routes'),
  status: require('./status.routes'),
  friend: require('./friend.routes'),
  message: require('./message.routes'),
  conversation: require('./conversation.routes'),
  conversationMember: require('./conversationMember.routes')
}

const app = express()
const server = http.createServer(app)
const io = socketio(server, {
  cors: {
    origin: "http://localhost:8080",
  },
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  })
)

io.sockets.on('connection', (socket) => {
  console.log('server socket connection')
  socket.emit('message', 'Hello Vue, I am server!')
  
  socket.on('selectConversation', async ({ conversation_id }) => {
    console.log('socket selectConversation fired')
    const messages = await updateMessages(conversation_id);
    socket.emit('messages', messages)
  })
})

// lets the socket be accessable through the req param
app.use(function(req,res,next){
  req.io = io;
  next();
});

app.use('/users', routes.user)
app.use('/status', routes.status)
app.use('/custom', routes.custom)
app.use('/friends', routes.friend)
app.use('/messages', routes.message)
app.use('/conversations', routes.conversation)
app.use('/conversation_members', routes.conversationMember)

module.exports = { server };
