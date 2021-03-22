const knex = require('../config/config')

async function checkConnection () {
  const users = await knex.select(1).from('users').limit(1)

  if (users && users.length) {
    return 'db connection successful'
  } else {
    return 'db connection failed'
  }
}

module.exports = {
  checkConnection
}