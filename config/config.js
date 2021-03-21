const dev = {
  client: 'postgres',
  connection: {
    host : 'localhost',
    user : 'postgres',
    password : '2345',
    database : 'chatapi'
  }
}

// at some point make prod as well, and pass in based on env
const knex = require('knex')(dev)
module.exports = knex;