const { sequelize, Sequelize } = require('../models/index')

async function getAllConversations () {
  return sequelize.models.Conversation.findAll();
}

async function getConversation (req) {
  return sequelize.models.Conversation.findAll({
    where: { id: req.body.id }
  })
}

async function getFirstConversationByUser (req) {
  let conversationsUserIsIn = await sequelize.models.ConversationMember.findAll({
    raw: true,
    attributes: ['conversationId'],
    where: { memberId: req.body.userId },
  })

  // console.log('yo yo yo: ', conversationsUserIsIn)

  let conversationIds = conversationsUserIsIn.map((conversation) => conversation.conversationId)

  let conversationUsers = await sequelize.models.ConversationMember.findAll({
    raw: true,
    // attributes: ['memberId', 'conversationId'],
    includes: [{ model: 'User' }],
    where: { conversationId: conversationIds },
  })

  console.log('conversationUsers ', conversationUsers)

  // let query = `select
  // conversation_members."conversationId", users.id as "userId", users.username as "username"
  // from conversation_members
  // inner join users on conversation_members."memberId" = users.id
  // where "conversationId" in (1,1,2,2,3,3)`

  // let rawQueryTest = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT })

  // console.log('yo yo yo: ', rawQueryTest)

  // let rawConvoOneMembers = convoOneMembers.map((m) => m.memberId)

  // let members = await sequelize.models.User.findAll({
  //   raw: true,
  //   attributes: ['id', 'username'],
  //   where: { id: rawConvoOneMembers }
  // })


  // we want to format the above into this
  let conversations = [
    {
      conversationId: null,
      conversationMembers: [],
    }
  ]

  // conversations[0].conversationId = conversationIds[0]
  // conversations[0].conversationMembers = members

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