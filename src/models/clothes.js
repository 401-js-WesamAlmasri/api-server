'use strict';
const mongoose = require('mongoose');

const clothSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String },
});

const ClothModel = mongoose.model('Cloth', clothSchema);

module.exports = ClothModel;
