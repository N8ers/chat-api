const { sequelize, Sequelize } = require('../models/index')

async function getAllConversations () {
  return sequelize.models.Conversation.findAll();
}

async function getConversation (req) {
  return sequelize.models.Conversation.findAll({
    where: { id: req.body.id }
  })
}

async function unordered (req) {
  let conversationsUserIsIn = await sequelize.models.ConversationMember.findAll({
    raw: true,
    attributes: ['conversationId'],
    where: { memberId: req.body.userId },
  })


  let conversationIds = conversationsUserIsIn.map((conversation) => conversation.conversationId)

  let query = `select
  conversation_members."conversationId", users.id as "userId", users.username as "username"
  from conversation_members
  inner join users on conversation_members."memberId" = users.id
  where "conversationId" in (:conversationIds)`

  let usersConversations = await sequelize.query(query, { 
    type: Sequelize.QueryTypes.SELECT,
    replacements: { conversationIds: conversationIds }
  })

  return usersConversations;
}

async function getConversationsByUser (req) {
  // this version works, but it isn't ordered properly //
  // return unordered(req)
  // ------------------------------------------------- //


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