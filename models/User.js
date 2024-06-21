const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegramId: String,
  count: Number,
  energy: Number,
});

const User = mongoose.model('User', userSchema);

module.exports = User;