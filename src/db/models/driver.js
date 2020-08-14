'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Driver.belongsTo(models.User);
    }
  };
  Driver.init({
    firstName: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    lastName: DataTypes.STRING(64),
    comment: DataTypes.TEXT,
    rate: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Driver',
  });
  return Driver;
};