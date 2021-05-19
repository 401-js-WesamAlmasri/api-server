'use strict';

const experss = require('express');
const router = experss.Router();
const validator = require('../middleware/validator');
const DataManager = require('../models/data-collection-class');
const Clothodel = require('../models/clothes');
const dataManager = new DataManager(Clothodel);

// routes
router.get('/', getClothes);
router.get('/:id', getSingleClothe);
router.post('/', validator, createClothe);
router.put('/:id', validator, updateClothe);
router.delete('/:id', deleteClothe);

// routes handlers

async function getClothes(req, res, next) {
  try {
    const clothArr = await dataManager.get();
    res.status(200).json(clothArr);
  } catch (e) {
    next(e);
  }
}

async function getSingleClothe(req, res, next) {
  try {
    const id = req.params.id;
    const clothObj = await dataManager.get(id);
    res.status(200).json(clothObj);
  } catch (e) {
    next(e);
  }
}

async function createClothe(req, res, next) {
  try {
    const data = req.body;
    const clothObj = await dataManager.create(data);
    res.status(201).json(clothObj);
  } catch (e) {
    next(e);
  }
}

async function updateClothe(req, res, next) {
  try {
    const id = req.params.id;
    const data = req.body;
    const clothObj = await dataManager.update(id, data);
    res.status(200).json(clothObj);
  } catch (e) {
    next(e);
  }
}

async function deleteClothe(req, res, next) {
  try {
    const id = req.params.id;
    const clothObj = await dataManager.delete(id);
    res.status(200).json(clothObj);
  } catch (e) {
    next(e);
  }
}

module.exports = router;