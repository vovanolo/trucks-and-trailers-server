'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Driver.belongsTo(models.User, { foreignKey: 'userId' });
      Driver.belongsTo(models.Truck, { foreignKey: 'truckId' });
      Driver.belongsTo(models.Trailer, { foreignKey: 'trailerId' });

      Driver.hasOne(models.Truck, { foreignKey: 'driverId' });
      Driver.hasOne(models.Trailer, { foreignKey: 'driverId' });

      Driver.hasMany(models.DayInfo, { foreignKey: 'driverId' });
    }
  }
  Driver.init(
    {
      firstName: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      lastName: DataTypes.STRING(64),
      comment: DataTypes.TEXT,
      rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Driver',
    }
  );
  return Driver;
};
