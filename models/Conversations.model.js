// SCHEMA

// id
// Members -> manyToMany foreign key user ids

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

  conversation.associate = function (models) {
    conversation.hasMany(models.User, {
      foreignKey: 'id',
      as: 'user_id',
    });
  }

  return conversation;
}