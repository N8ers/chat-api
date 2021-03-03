const { sequelize, Sequelize } = require('../models/index')

async function getAllConversationMembers () { 
  return sequelize.models.ConversationMember.findAll()
}

async function getAllConversationMembersByMember (req) { 
  return sequelize.models.ConversationMember.findAll({
    where: {
      memberId: req.body.userId
    }
  })
}

async function getAllConversationMembersByConversation (req) { 
  return sequelize.models.ConversationMember.findAll({
    where: {
      conversationId: req.body.conversationId
    }
  })
}

async function createConversationMember (req) {
  return sequelize.models.ConversationMember.create({
    memberId: req.body.memberId,
    conversationId: req.body.conversationId
  })
}

async function deleteConversationMember (req) {
  return sequelize.models.ConversationMember.destroy({
    where: {
      memberId: req.body.userId
    }
  })
}

module.exports = {
  createConversationMember,
  getAllConversationMembers,
  getAllConversationMembersByMember,
  getAllConversationMembersByConversation,
  deleteConversationMember
}