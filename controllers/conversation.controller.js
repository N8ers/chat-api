const { sequelize } = require('../models/index')

async function getAllConversations () {
  return sequelize.models.Conversation.findAll();
}

async function getConversation (req) {
  return sequelize.models.Conversation.findAll({
    where: { id: req.body.id }
  })
}

async function getFirstConversationByUser (req) {
  let conversationMembers = await sequelize.models.ConversationMember.findAll({
    raw: true,
    attributes: ['conversationId'],
    where: { memberId: req.body.userId },
  })

  let conversationIds = conversationMembers.map((conversation) => conversation.conversationId)

  let convoOneMembers = await sequelize.models.ConversationMember.findAll({
    raw: true,
    attributes: ['memberId'],
    where: { conversationId: conversationIds[0] },
  })

  let rawConvoOneMembers = convoOneMembers.map((m) => m.memberId)

  let members = await sequelize.models.User.findAll({
    raw: true,
    attributes: ['id', 'username'],
    where: { id: rawConvoOneMembers }
  })


  // we want to format the above into this
  let conversations = [
    {
      conversationId: null,
      conversationMembers: [],
    }
  ]

  conversations[0].conversationId = conversationIds[0]
  conversations[0].conversationMembers = members

  return conversations
}

async function getConversationsByUser (req) {
  return await getFirstConversationByUser(req)
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