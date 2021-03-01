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
    authorId: { type: DataTypes.INTEGER, allowNull: false },
    conversationId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: true,
    tableName: 'messages'
  });

  message.associate = function (models) {
    message.hasOne(models.Conversation, { foreignKey: 'id' })
    message.belongsTo(models.User, { foreignKey: 'id' })
  }

  return message;
}
