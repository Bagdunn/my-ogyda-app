const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Click', clickSchema);