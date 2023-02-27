'use strict';

const booksModel = (sequelize, DataTypes) => sequelize.define('books', {
  name: { type: DataTypes.STRING, required: true },
  category: { type: DataTypes.STRING, required: false },
  author: { type: DataTypes.STRING, required: false },
  usersId: { type: DataTypes.INTEGER, required: true },
});

module.exports = booksModel;