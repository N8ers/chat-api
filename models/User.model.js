module.exports = function (sequelize, DataTypes) {
  const user = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
  },
  {
    timestamps: true,
    tableName: 'users'
  });

  user.associate = function (models) {
    // user.hasMany(models.conversationMember, { foreignKey: 'memberId' })
    user.hasMany(models.ConversationMember, { as: 'member' })
  }

  return user;
}

// user has many conversationMember
// conversationMember has one user

// Team.hasMany(Player, { foreignKey: 'clubId' });
// Player.belongsTo(Team);
