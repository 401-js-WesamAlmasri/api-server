'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const notFoundHanlder = require('./error-handlers/404');
const errorHnalder = require('./error-handlers/500');

// importing routes
const v1Router = require('./routes/v1');
const moduleFinder = require('./middleware/model-finder');

// regester middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// register routers
app.use('/api/v1/:module', moduleFinder, v1Router);

// regester middlewares
app.use('*', notFoundHanlder);
app.use(errorHnalder);

function start(port) {
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
}

module.exports = {
  app: app,
  start: start,
};
