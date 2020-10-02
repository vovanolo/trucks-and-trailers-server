'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trailer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Trailer.belongsTo(models.User, { foreignKey: 'userId' });
      Trailer.belongsTo(models.Driver, { foreignKey: 'driverId' });
      Trailer.belongsTo(models.Company, { foreignKey: 'companyId' });
    }
  }
  Trailer.init(
    {
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      comment: DataTypes.TEXT,
      location: DataTypes.STRING,
      driverId: DataTypes.INTEGER,
      companyId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Trailer',
    }
  );
  return Trailer;
};
