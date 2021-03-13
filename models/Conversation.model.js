module.exports = function (sequelize, DataTypes) {
  const conversation = sequelize.define('Conversation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  },
  {
    timestamps: true,
    tableName: 'conversations'
  });

  conversation.associate = function (models) {
    conversation.hasMany(models.Message)
  }

  return conversation;
}
