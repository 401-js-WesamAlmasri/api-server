'use strict';

module.exports = (req, res, next) => {
  const body = req.body;
  if (body.name && body.type ) {
    next();
  } else {
    const error = new Error('Invalid request body');
    next(error);
  }
};
