module.exports = function (sequelize, DataTypes) {
  const conversationMember = sequelize.define('ConversationMember', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    conversationId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: true,
    tableName: 'conversation_members'
  });

  conversationMember.associate = function (models) {
    // conversationMember.hasOne(models.User, { foreignKey: 'memberId' })
    // conversationMember.belongsTo(models.User, 
    //   {
    //     foreignKey: {
    //       allowNull: false,
    //       as: 'memberId'
    //     }
    //   }
    //   )
    // conversationMember.hasOne(models.Conversation, { foreignKey: 'memberId' })
  }

  return conversationMember;
}
