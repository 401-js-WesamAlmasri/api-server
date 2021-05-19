'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const notFoundHanlder = require('./error-handlers/404');
const errorHnalder = require('./error-handlers/500');

// importing routes
const foodRouter = require('./routes/food');
const clothesRouter = require('./routes/clothes');

// regester middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// register routers
app.use('/api/v1/food', foodRouter);
app.use('/api/v1/clothes', clothesRouter);

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
