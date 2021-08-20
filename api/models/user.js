const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randomize = require('randomatic');
const db = require('./')
module.exports = (sequelize, DataTypes, Sequelize) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        /*   get() {
             const id_h = this.getDataValue('id');
             return crypto.createHash('sha1').update(id_h.toString()).digest('hex')
           }*/
      },
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      dob: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      city: {
        type: DataTypes.STRING
      },
      country: {
        type: DataTypes.STRING
      },
      zip: {
        type: DataTypes.STRING
      },

      isActive: {
        defaultValue: true,
        type: DataTypes.BOOLEAN
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      organizationId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      freezeTableName: true

    }
  )
  // associations
  User.associate = (models) => {
    models.user.belongsTo(models.role, { foreignKey: 'roleId' })
    models.user.belongsTo(models.organization)

  }

  User.addHook('beforeCreate', async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });


  // Generate email confirm token
  User.generateEmailConfirmToken = function (next) {
    // email confirmation token
    const confirmationToken = crypto.randomBytes(20).toString('hex');

    this.confirmEmailToken = crypto
      .createHash('sha256')
      .update(confirmationToken)
      .digest('hex');

    const confirmTokenExtend = crypto.randomBytes(100).toString('hex');
    const confirmTokenCombined = `${confirmationToken}.${confirmTokenExtend}`;
    return confirmTokenCombined;
  };

  // Sign JWT and return
  User.prototype.getSignedJwtToken = async function () {
    const role = await sequelize.models.role.findByPk(this.roleId)
    const payload = { id: this.id, role: role.role, organizationId: this.organizationId, email: this.email }
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };

  // Match user entered password to hashed password in database
  User.prototype.matchPassword = async function (enteredPassword) {
    console.log(this.password)
    return await bcrypt.compare(enteredPassword, this.password);
  };
  return User

}