const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
  telegramId: String,
  count: Number,
  energy: Number,
});

const Click = mongoose.model('Click', clickSchema);

module.exports = Click;