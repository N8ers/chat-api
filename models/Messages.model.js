// SCHEMA

// id
// content
// Author_id -> Foreign key Users Id
// Conversation_id -> Foreign key Conversations Id

module.exports = function (sequelize, DataTypes) {
  const message = sequelize.define('Message', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  });

  message.associate = function (models) {
    message.belongsTo(models.User, {
      foreignKey: id,
      as: 'authorId'
    })
    
    message.hasOne(models.Conversation, {
      foreignKey: id,
      as: 'conversationId'
    })
  }

  return Message;
}