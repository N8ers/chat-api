const { sequelize } = require('../models/index')

async function checkConnection () {
  let result = null;
  await sequelize.authenticate()
    .then(() => result = true)
    .catch((err) => result = false)
  return result;
}

module.exports = {
  checkConnection
}