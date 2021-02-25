const { sequelize, Sequelize } = require('../models/index')

async function getAllUsers () {
  let query = `SELECT * FROM "user"`
  return await sequelize.query(query, {
    model: sequelize.models.User,
    type: sequelize.QueryTypes.SELECT
  });
}

async function createUser (req) {
  let { username } = req.body
  let query = `INSERT INTO "user" (username) VALUES ('${username}')`
  return await sequelize.query(query, {
    model: sequelize.models.User,
    type: sequelize.QueryTypes.SELECT
  });
}

module.exports = {
  getAllUsers,
  createUser
}