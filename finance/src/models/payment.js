/* eslint-disable strict */
/* eslint-disable no-unused-vars */

'use strict';

const {
  Model,
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
    value: DataTypes.FLOAT,
    name: DataTypes.STRING,
    number: DataTypes.STRING,
    expiration: DataTypes.STRING,
    cvv: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};
