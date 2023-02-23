
'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const clothesModel = require('./clothes/model.js');
const foodModel = require('./food/model.js');
const Collection = require('./data-collection.js');
const userModel = require('./users');
// const userModel = require('..auth//users/model.js');

//chnaged this durig demo
// const DATABASE_URL = process.env.NODE_ENV === 'test'? 'sqlite:memory:':process.env.DATABASE_URL;
const DATABASE_URL = process.env.NODE_ENV === 'test' 
  ? 'sqlite::memory' 
  : process.env.DATABASE_URL;


const sequelizeDatabase = new Sequelize(DATABASE_URL);
const food = foodModel(sequelizeDatabase, DataTypes);
const clothes = clothesModel(sequelizeDatabase, DataTypes);

module.exports = {
  db: sequelizeDatabase,
  food: new Collection(food),
  clothes: new Collection(clothes),
  users:userModel(sequelizeDatabase, DataTypes),
};
