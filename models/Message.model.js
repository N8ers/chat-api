module.exports = function (sequelize, DataTypes) {
  const message = sequelize.define('Message', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    content: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
    authorId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    conversationId: { 
      type: DataTypes.INTEGER, 
      allowNull: false ,
      references: {
        model: Conversation,
        key: 'id'
      }
    },
  },
  {
    timestamps: true,
    tableName: 'messages'
  });

  message.associate = function (models) {
    message.belongsTo(models.User)
    message.belongsTo(models.Conversation)
  }

  return message;
}
