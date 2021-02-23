module.exports = function (sequelize, DataTypes) {
  const conversationMember = sequelize.define('conversationMember', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  });

  conversationMember.associate = function (models) {
    conversationMember.hasMany(models.User, {
      foreignKey: 'id',
      as: 'memberId'
    })
  }

  return conversationMember;
}
