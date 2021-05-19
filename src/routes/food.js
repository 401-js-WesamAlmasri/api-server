'use strict';

const experss = require('express');
const router = experss.Router();
const DataManager = require('../models/data-collection-class');
const FoodModel = require('../models/food');
const dataManager = new DataManager(FoodModel);
const validator = require('../middleware/validator');

// routes
router.post('/', validator, createFood);
router.get('/', getFoods);
router.get('/:id', getSingleFood);
router.put('/:id', validator, updateFood);
router.delete('/:id', deleteFood);

// routes handlers

async function getFoods(req, res, next) {
  try {
    const foodsArr = await dataManager.get();
    res.status(200).json(foodsArr);
  } catch (e) {
    next(e);
  }
}

async function getSingleFood(req, res, next) {
  try {
    const id = req.params.id;
    const foodObj = await dataManager.get(id);
    res.status(200).json(foodObj);
  } catch (e) {
    next(e);
  }
}

async function createFood(req, res, next) {
  try {
    const data = req.body;
    const foodObj = await dataManager.create(data);
    res.status(201).json(foodObj);
  } catch (e) {
    next(e);
  }
}

async function updateFood(req, res, next) {
  try {
    const id = req.params.id;
    const data = req.body;
    const foodObj = await dataManager.update(id, data);
    res.status(200).json(foodObj);
  } catch (e) {
    next(e);
  }
}

async function deleteFood(req, res, next) {
  try {
    const id = req.params.id;
    const foodObj = await dataManager.delete(id);
    res.status(200).json(foodObj);
  } catch (e) {
    next(e);
  }
}

module.exports = router;
