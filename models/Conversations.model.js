module.exports = function (sequelize, DataTypes) {
  const conversation = sequelize.define('Conversation', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  });

  return conversation;
}
