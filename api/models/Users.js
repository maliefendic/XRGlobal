const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randomize = require('randomatic');

module.exports = (sequelize, DataTypes, Sequelize) => {
  const Users = sequelize.define(
    'Users',
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
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
      }

    },
    {
      freezeTableName: true

    }
  )
  // associations
  Users.associate = (models) => {
    models.Users.belongsTo(models.Role)
    models.Users.belongsTo(models.Organization)

  }

  Users.addHook('beforeCreate', async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });


  // Generate email confirm token
  Users.generateEmailConfirmToken = function (next) {
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
  Users.prototype.getSignedJwtToken = function () {
    return jwt.sign({ id: this._previousDataValues.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };

  // Match user entered password to hashed password in database
  Users.prototype.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this._previousDataValues.password);
  };
  return Users

}