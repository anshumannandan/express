const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  slot: { type: String, required: true },
  status: { type: String, default: 'pending' },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
