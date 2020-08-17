'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DayInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DayInfo.belongsTo(models.Driver);
      DayInfo.belongsTo(models.User);
    }
  };
  DayInfo.init({
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    location: DataTypes.STRING,
    value: DataTypes.FLOAT,
    status: {
      type: DataTypes.ENUM('off', 'localRun', 'inTransit'),
      defaultValue: 'off'
    }
  }, {
    sequelize,
    modelName: 'DayInfo',
  });
  return DayInfo;
};