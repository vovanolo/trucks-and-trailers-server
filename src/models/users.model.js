const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../sequelize');

const User = sequelize.define('User', {
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
    defaultValue: 'user',
  },
  firstName: {
    type: DataTypes.STRING(64)
  },
  lastName: {
    type: DataTypes.STRING(64)
  }
});

module.exports = User;