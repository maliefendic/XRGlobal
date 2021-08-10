
module.exports = (sequelize, DataTypes, Sequelize) => {
  const Role = sequelize.define('Role', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    role: {
      type: DataTypes.STRING,
    },
  }, {
    freezeTableName: true,
  })

  Role.associate = (models) => {
    models.Role.hasMany(models.Users)
  }

  return Role
}
