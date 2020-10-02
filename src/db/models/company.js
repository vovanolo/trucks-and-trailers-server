'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Company.belongsTo(models.User, { foreignKey: 'userId' });

      Company.hasMany(models.Driver, { foreignKey: 'companyId' });
      Company.hasMany(models.Truck, { foreignKey: 'companyId' });
      Company.hasMany(models.Trailer, { foreignKey: 'companyId' });
    }
  }
  Company.init(
    {
      name: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Company',
    }
  );
  return Company;
};
