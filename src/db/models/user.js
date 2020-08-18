'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Driver);
      User.hasMany(models.Truck);
      User.hasMany(models.Trailer);
      User.hasMany(models.DayInfo);
    }

    async validPassword(password) {
      const check = await bcrypt.compare(password, this.password);
      return check;
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user'
    },
    firstName: DataTypes.STRING(64),
    lastName: DataTypes.STRING(64)
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, parseInt(process.env.SALT_ROUNDS));
      }
    }
  });

  return User;
};
