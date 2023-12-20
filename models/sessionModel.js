const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  slot: { type: Date, required: true },
  status: {
    type: String,
    enum: ['pending', 'available', 'completed'],
    default: 'pending',
  },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
