'use strict';

const express = require('express');
const authRouter = express.Router();

const { readers, books } = require('./models');
const basicAuth = require('./middleware/basics');
const bearerAuth = require('./middleware/bearer.js');
const permissions = require('./middleware/acl.js');

authRouter.post('/signup', async (req, res, next) => {
  try {
    let userRecord = await readers.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token,
  };
  res.status(200).json(user);
});

authRouter.get(
  '/readers',
  bearerAuth,
  permissions('delete'),
  async (req, res, next) => {
    const userRecords = await readers.findAll({});
    const list = userRecords.map(user => user.username);
    res.status(200).json(list);
  },
);

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Welcome to the secret area');
});

authRouter.get('/booksRead/:id', bearerAuth, async (req, res, next) => {
  const userRecord = await readers.findByPk(req.params.id, {include: books.model});
  res.status(200).json(userRecord);
});

module.exports = authRouter;
