module.exports = (sequelize, DataTypes, Sequelize) => {
  const File = sequelize.define('File', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    name: {
      allowNull: false,
      type: DataTypes.STRING
    },

    url: {
      allowNull: false,
      type: DataTypes.STRING
    },

    type: {
      allowNull: false,
      type: DataTypes.INTEGER
    },

  }, {
    freezeTableName: true,
  })
  // associations
  File.associate = (models) => {
    models.File.hasMany(models.Organization)
    models.File.hasMany(models.TypeFile)
  }
  return File
}
