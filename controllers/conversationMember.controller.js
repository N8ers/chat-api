const { sequelize, Sequelize } = require('../models/index')

async function getAllConversationMembers () { 
  return sequelize.models.ConversationMember.findAll()
}

async function getAllConversationMembersByMember (req) { 
  return sequelize.models.ConversationMember.findAll({
    where: {
      user: req.body.userId
    },
    include: ['User']
  })
}





async function getAllConversationMembersByConversation (req) { 
  return sequelize.models.ConversationMember.findAll({
    where: {
      conversationId: req.body.conversationId
    },
    include: [ 
      'User'
    ]
  })
}







async function createConversationMember (req) {
  return sequelize.models.ConversationMember.create({
    userId: req.body.userId,
    conversationId: req.body.conversationId
  })
}

async function deleteConversationMember (req) {
  return sequelize.models.ConversationMember.destroy({
    where: {
      memberId: req.body.userId,
      conversationId: req.body.conversationId
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