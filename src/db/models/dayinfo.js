'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DayInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DayInfo.belongsTo(models.Driver, { foreignKey: 'driverId' });
      DayInfo.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  DayInfo.init(
    {
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time: DataTypes.STRING,
      location: DataTypes.STRING,
      value: DataTypes.FLOAT,
      miles: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM('off', 'localRun', 'inTransit'),
        defaultValue: 'off',
      },
      driverId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'DayInfo',
    }
  );
  return DayInfo;
};
