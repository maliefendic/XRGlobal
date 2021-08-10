module.exports = (sequelize, DataTypes, Sequelize) => {
  const TypeFile = sequelize.define('TypeFile', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
  }, {
    freezeTableName: true,
  })

  TypeFile.associate = (models) => {
    models.TypeFile.belongsTo(models.File)
  }

  return TypeFile
}
