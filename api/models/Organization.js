/* jshint indent: 2 */

module.exports = (sequelize, DataTypes, Sequelize) => {
  const Organization = sequelize.define(
    'organization',
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      businessName: {
        type: DataTypes.STRING
      },
      logo: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      city: {
        type: DataTypes.STRING
      },
      zip: {
        type: DataTypes.STRING
      },
      country: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },

      website: {
        type: DataTypes.STRING
      },

      isActive: {
        defaultValue: true,
        type: DataTypes.BOOLEAN
      },

    },
    {
      freezeTableName: true
    }
  )

  // associations
  Organization.associate = (models) => {
    models.organization.hasMany(models.user)
    models.organization.hasMany(models.file)

  }
  return Organization
}
