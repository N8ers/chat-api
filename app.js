const app = require('./routes/index')
const knex = require('./config/config')

const PORT = 3000

async function init() {
  // check that we can query db
  const users = await knex.select(1).from('users').limit(1)

  if (users && users.length) {
    app.listen(PORT, () => console.log(`chat-api running on port ${PORT}`))
  } else {
    console.log('connection to db failed, process exited')
    process.exit(1)
  }
}

init()