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
      User.hasMany(models.Driver, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      User.hasMany(models.Company, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      User.hasMany(models.Truck, { foreignKey: 'userId', onDelete: 'CASCADE' });
      User.hasMany(models.Trailer, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      User.hasMany(models.DayInfo, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }

    async validPassword(password) {
      return await bcrypt.compare(password, this.password);
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
      },
      firstName: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: async (user) => {
          user.password = await bcrypt.hash(
            user.password,
            parseInt(process.env.SALT_ROUNDS)
          );
        },
        beforeUpdate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(
              user.password,
              parseInt(process.env.SALT_ROUNDS)
            );
          }
        },
        beforeBulkCreate: async (user) => {
          user.attributes.password = await bcrypt.hash(
            user.attributes.password,
            parseInt(process.env.SALT_ROUNDS)
          );
        },
        beforeBulkUpdate: async (user) => {
          if (user.attributes.password) {
            user.attributes.password = await bcrypt.hash(
              user.attributes.password,
              parseInt(process.env.SALT_ROUNDS)
            );
          }
        },
      },
    }
  );
  return User;
};
