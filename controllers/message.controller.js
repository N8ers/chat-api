const { sequelize, Sequelize } = require('../models/index')

async function getAllMessages () {
  return sequelize.models.Message.findAll();
}

async function getAllMessagesById (req) {
  return sequelize.models.Message.findAll({
    where: { id: req.body.id }
  });
}

async function getAllMessagesByAuthorId (req) {
  return sequelize.models.Message.findAll({
    where: { authorId: req.body.authorId }
  });
}

async function getAllMessagesByConversationId (req) {
  return sequelize.models.Message.findAll({
    where: { conversationId: req.body.conversationId }
  });
}

async function createMessage (req) {
  return sequelize.models.Message.create({
    content: req.body.content,
    authorId: req.body.authorId,
    conversationId: req.body.conversationId
  });
}

async function deleteMessageById (req) {
  return sequelize.models.Message.destroy({
    where: { id: req.body.id }
  });
}

module.exports = {
  getAllMessages,
  getAllMessagesById,
  getAllMessagesByAuthorId,
  getAllMessagesByConversationId,
  createMessage,
  deleteMessageById
}