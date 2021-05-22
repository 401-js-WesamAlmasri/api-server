'use strict';

const experss = require('express');
const router = experss.Router();
const validator = require('../middleware/validator');

// routes
router.post('/', validator, createRecord);
router.get('/', getRecord);
router.get('/:id', getSingleRecord);
router.put('/:id', validator, updateRecord);
router.delete('/:id', deleteRecord);

// routes handlers

async function getRecord(req, res, next) {
  try {
    const dataManager = req.dataManager;
    const recordsArr = await dataManager.get();
    res.status(200).json(recordsArr);
  } catch (e) {
    next(e);
  }
}

async function getSingleRecord(req, res, next) {
  try {
    const dataManager = req.dataManager;
    const id = req.params.id;
    const recordObj = await dataManager.get(id);
    res.status(200).json(recordObj);
  } catch (e) {
    next(e);
  }
}

async function createRecord(req, res, next) {
  try {
    const dataManager = req.dataManager;
    const data = req.body;
    const recordObj = await dataManager.create(data);
    res.status(201).json(recordObj);
  } catch (e) {
    next(e);
  }
}

async function updateRecord(req, res, next) {
  try {
    const dataManager = req.dataManager;
    const id = req.params.id;
    const data = req.body;
    const recordObj = await dataManager.update(id, data);
    res.status(200).json(recordObj);
  } catch (e) {
    next(e);
  }
}

async function deleteRecord(req, res, next) {
  try {
    const dataManager = req.dataManager;
    const id = req.params.id;
    const recordObj = await dataManager.delete(id);
    res.status(200).json(recordObj);
  } catch (e) {
    next(e);
  }
}

module.exports = router;
