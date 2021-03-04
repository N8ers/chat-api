const { sequelize } = require('../models/index')

async function getAllConversations () {
  return sequelize.models.Conversation.findAll();
}

async function getConversation (req) {
  return sequelize.models.Conversation.findAll({
    where: { id: req.body.id }
  })
}

async function getConversationsByUser (req) {
  let result = sequelize.models.Conversation.findAll({
    where: { id: req.body.userId },
    include: [{
      model: sequelize.models.User,
      required: true
    }]
  })
  console.log('result ', result)
  return result
}

async function createConversation () {
  return sequelize.models.Conversation.create()
}

async function deleteConversation (req) {
  return sequelize.models.Conversation.destroy({
    where: { id: req.body.id },
    returning: true
  })
}

module.exports = {
  getAllConversations,
  getConversation,
  getConversationsByUser,
  createConversation,
  deleteConversation
}