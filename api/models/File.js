module.exports = (sequelize, DataTypes, Sequelize) => {
  const File = sequelize.define('file', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    name: {
      allowNull: false,
      type: DataTypes.STRING
    },

    bucket_name: {
      allowNull: false,
      type: DataTypes.STRING
    },

    type: {
      allowNull: false,
      type: DataTypes.INTEGER
    },

  }, {
    freezeTableName: true

  })
  // associations
  File.associate = (models) => {
    models.file.belongsTo(models.organization)
  }
  return File
}
