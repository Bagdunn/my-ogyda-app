const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  clicks: { type: Number, default: 0 },
  energy: { type: Number, default: 100 }
});

const User = mongoose.model('User', userSchema);

module.exports = User;