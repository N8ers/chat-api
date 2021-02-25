const { sequelize, Sequelize } = require('../models/index')

async function getAllUsers () {
  let query = `SELECT * FROM "user"`
  return await sequelize.query(query, {
    model: sequelize.models.User,
    type: sequelize.QueryTypes.SELECT
  });
}

async function getUserById (req) {
  let { id } = req.body
  let query = `SELECT * FROM "user" WHERE id = ${id}`
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

async function editUser (req) {
  let { username, id } = req.body
  let query = `UPDATE "user" SET username = '${username}' WHERE id = ${id}`
  return await sequelize.query(query, {
    model: sequelize.models.User,
    type: sequelize.QueryTypes.SELECT
  });
}

async function deleteUser (req) {
  let { id } = req.body
  let query = `DELETE from "user" WHERE id = ${id}`
  return await sequelize.query(query, {
    model: sequelize.models.User,
    type: sequelize.QueryTypes.SELECT
  });
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser
}