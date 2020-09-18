'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Truck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Truck.belongsTo(models.User, { foreignKey: 'userId' });
      Truck.belongsTo(models.Driver, { foreignKey: 'driverId' });

      Truck.hasOne(models.Driver, { foreignKey: 'truckId' });
    }
  }
  Truck.init(
    {
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      comment: DataTypes.TEXT,
      rate: DataTypes.FLOAT,
      ownedByCompany: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      driverId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Truck',
    }
  );
  return Truck;
};
