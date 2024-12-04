'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VipCost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VipCost.hasMany(models.Post, { foreignKey: 'vipcost_id', as: 'posts' });

    }
  }
  VipCost.init({

    name : DataTypes.STRING,
    day : DataTypes.INTEGER,
    month:  DataTypes.INTEGER,
    week: DataTypes.INTEGER,
    top : DataTypes.INTEGER,
    html : DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'VipCost',
    tableName: 'vipcost'
  });
  return VipCost;
};