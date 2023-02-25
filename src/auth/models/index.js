
'use strict';

const { Sequelize, DataTypes } = require('sequelize');

const booksModel = require('./books/model.js');
const coffeeModel = require('./coffee/model.js');
const Collection = require('./data-collection.js');
const userModel = require('./readers');


const DATABASE_URL = process.env.NODE_ENV === 'test' 
  ? 'sqlite::memory' 
  : process.env.DATABASE_URL;


const sequelizeDatabase = new Sequelize(DATABASE_URL);
const books = booksModel(sequelizeDatabase, DataTypes);
const coffee = coffeeModel(sequelizeDatabase, DataTypes);
const readers = userModel(sequelizeDatabase, DataTypes);

readers.hasMany(books);
books.belongsTo(readers);

module.exports = {
  db: sequelizeDatabase,
  books: new Collection(books),
  coffee: new Collection(coffee),
  readers,
};
