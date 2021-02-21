const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  database: 'chatapi',
  username: 'postgres',
  password: '2345',
  host: 'localhost',
  dialect: 'postgres'
})

module.exports = sequelize
