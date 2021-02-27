const { sequelize, Sequelize } = require('../models/index')

async function getAllUsers () {
  return sequelize.models.User.findAll();
}

async function getUserById (req) {
  return sequelize.models.User.findAll({
    where: { id: req.body.id }
  })
}

async function createUser (req) {
  return sequelize.models.User.create({
    username: req.body.username
  })
}

async function editUser (req) {
  let [ id, result ] = await sequelize.models.User.update({ username: req.body.username }, { 
    where: { id: req.body.id },
    returning: true
  })
  let [ dataValue ] = result
  return dataValue
}

async function deleteUser (req) {
  return sequelize.models.User.destroy({
    where: { id: req.body.id },
    returning: true
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser
}