
module.exports = (sequelize, DataTypes, Sequelize) => {
  const Role = sequelize.define('role', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    role: {
      type: DataTypes.STRING,
    },
  }, {
    freezeTableName: true
  })

  Role.associate = (models) => {
    models.role.hasMany(models.user)
  }

  return Role
}
