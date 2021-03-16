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
    userId: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      } 
    },
    conversationId: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: {
        model: 'Conversation',
        key: 'id'
      } 
    },
  },
  {
    timestamps: true,
    tableName: 'conversation_members'
  });

  conversationMember.associate = function (models) {
    conversationMember.belongsTo(models.User, { foreignKey: 'id' })
  }

  return conversationMember;
}
