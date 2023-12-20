const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  universityId: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'dean'], required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
