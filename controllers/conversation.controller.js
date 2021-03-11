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

  let queryUsersAsObjFirstTry = `select
  json_build_object(
    'conversationId', conversation_members."conversationId",
    'User', json_build_object(
      'userId', users.id,
      'userName', users.username 
    )
  ) 
  from conversation_members
  inner join users on conversation_members."memberId" = users.id
  where "conversationId" in (:conversationIds)`

  let queryUsersAsObjSecond = `select
    conversation_members."conversationId",
    json_build_object(
      'userId', users.id,
      'userName', users.username 
    ) as "User"
  from conversation_members
  inner join users on conversation_members."memberId" = users.id
  where "conversationId" in (:conversationIds)`


  let usersConversations = await sequelize.query(queryUsersAsObjSecond, { 
    type: Sequelize.QueryTypes.SELECT,
    replacements: { conversationIds: conversationIds }
  })

  return usersConversations;
}

async function getConversationsByUser (req) {
  // this version works, but it isn't ordered properly //
  // return unordered(req)
  // ------------------------------------------------- //

  let conversationsUserIsIn = await sequelize.models.ConversationMember.findAll({
    raw: true,
    attributes: ['conversationId', 'memberId'],
    where: { memberId: req.body.userId },
    // include: [
      // {
        // model: sequelize.model.Conversation
      // }
    // ]
  })


  // let conversationIds = conversationsUserIsIn.map((conversation) => conversation.conversationId)

  // let conversationsWithFullUserObj = await sequelize.models.Conversation.findAll({
  //   where: { id: conversationIds },
  //   include: [
  //     {
  //       model: sequelize.models.
  //     }
  //   ]
  // })

  // return conversationsWithFullUserObj

  return conversationsUserIsIn

}

async function createConversation (req) {
  console.log('req.body ', req.body)

  let res = sequelize.models.Conversation.create({
    userId: req.body.userId,
    conversationId: req.body.conversationId
  })

  console.log('res ', res)
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