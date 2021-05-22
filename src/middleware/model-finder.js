'use strict';

const DataManager = require('../models/data-collection-class');

module.exports = (req, res, next) => {
  try {
    const module = req.params.module;
    const Model = require(`../models/${module}`);
    const dataManager = new DataManager(Model);
    req.dataManager = dataManager;
    next();
  } catch (e) {
    let error = new Error('Not Found');
    error.statusCode = 404;
    next(error);
  }
};
