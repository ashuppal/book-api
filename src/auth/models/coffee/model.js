'use strict';

const coffeeModel = (sequelize, DataTypes) => sequelize.define('coffee', {
  name: { type: DataTypes.STRING, required: true },
  type: { type: DataTypes.STRING, required: false },
  price: { type: DataTypes.INTEGER, required: false },
});

module.exports = coffeeModel;