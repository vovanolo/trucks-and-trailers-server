'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Truck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Truck.belongsTo(models.User);
      Truck.belongsTo(models.Driver);
    }
  };
  Truck.init({
    name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    comment: DataTypes.TEXT,
    rate: DataTypes.FLOAT(64),
    ownedByCompany: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Truck',
  });
  return Truck;
};