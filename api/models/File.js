module.exports = (sequelize, DataTypes, Sequelize) => {
  const File = sequelize.define('file', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },

    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    url: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true

  })
  // associations
  File.associate = (models) => {
    models.file.belongsTo(models.organization)
  }
  return File
}
