const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  card: { type: Number, required: true },
  pack: { type: Number, required: true },
  perDay: { type: Number, required: true },
  dosage: { type: String, required: true }
});

const Drug = mongoose.model('Drug', schema);
module.exports = Drug;
