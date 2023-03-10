'use strict';

require('dotenv').config();
const app = require('./src/auth/server.js');
const { db } = require('./src/auth/models');

db.sync().then(() => {
  app.start(process.env.PORT || 3002);
});

