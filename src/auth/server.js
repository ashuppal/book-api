'use strict';

const express = require('express');

const notFoundHandler = require('./error-handlers/404.js');

const errorHandler = require('./error-handlers/500.js');

const logger = require('./middleware/logger.js');

const v1Routes = require('../routes/v1.js');


const authRoutes = require('../auth/routes');

const app = express();

app.use(express.json());

app.use(logger);

app.use(authRoutes);

// assuming you are on port 3001:
// http://localhost:3001/api/v1/books
app.use('/api/v1', v1Routes);


app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};

