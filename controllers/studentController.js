const Session = require('../models/sessionModel');
const moment = require('moment');

const getFreeSessions = async (req, res) => {
  try {
    if (req.userRole !== 'student') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Assuming the dean's available slots are hardcoded for simplicity
    const availableSlots = await Session.find({ status: 'available', slot: { $gte: new Date() } }).distinct('slot');

    res.json({ freeSessions: availableSlots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const bookSession = async (req, res) => {
  const { slot } = req.body;
  const studentId = req.userId;

  try {
    if (req.userRole !== 'student') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const existingSession = await Session.findOne({ slot, status: 'pending' });

    if (existingSession) {
      return res.status(400).json({ message: 'Slot is already booked' });
    }

    // Check if the slot is available
    const availableSession = await Session.findOne({ slot, status: 'available' });

    if (!availableSession || moment(availableSession.slot).isBefore(moment())) {
      return res.status(400).json({ message: 'Invalid slot or slot is not available' });
    }

    availableSession.status = 'pending';
    availableSession.studentId = studentId;
    await availableSession.save();

    res.json({ message: `Session booked for ${slot}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getFreeSessions, bookSession };
