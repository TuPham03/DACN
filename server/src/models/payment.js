'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }

  Payment.init({
    uid : DataTypes.STRING,
    requestid : DataTypes.STRING,
    vnd:  DataTypes.INTEGER,
    status : DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'payment',
    tableName: 'payment'
  });
  return Payment;
};