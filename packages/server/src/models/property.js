'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Property.init(
    {
      tenant_id: DataTypes.UUID,
      category_id: DataTypes.UUID,
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      pictures: DataTypes.TEXT,
      description: DataTypes.TEXT,
      avg_rating: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'Property',
    },
  );
  return Property;
};
