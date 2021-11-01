/* jshint indent: 2 */
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes, Sequelize) => {
  const Branch_user = sequelize.define(
    'branch_user',
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },

      name: {
        type: DataTypes.STRING,
      }

    },
    {
      freezeTableName: true
    }
  )

  // associations
  Branch_user.associate = (models) => {
    models.branch_user.hasMany(models.user, { as: 'user' })
  }

  Branch_user.addHook('beforeCreate', async (user) => {
    user.name = "Trainee " + user.id
  });


  // Sign JWT and return
  Branch_user.prototype.getSignedJwtToken = async function () {
    const payload = { id: this.id, role: "branch", branchId: this.userId }
    return jwt.sign(payload, process.env.JWT_SECRET, {});
  };

  return Branch_user
}
