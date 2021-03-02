const { sequelize, Sequelize } = require('../models/index')

async function getAllConversationMembers () { }

async function createConversationMember (req) {
  return sequelize.models.ConversationMember.create({
    memberId: req.body.memberId,
    conversationId: req.body.conversationId
  })
}

module.exports = {
  createConversationMember
}