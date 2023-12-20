const Session = require('../models/sessionModel');

const getFreeSessions = async (req, res) => {
  try {
    if (req.userRole !== 'student') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Assuming the dean's available slots are hardcoded for simplicity
    const freeSlots = ['Thursday 10 AM', 'Friday 10 AM'];

    // Check for already booked slots
    const bookedSlots = await Session.find({ status: 'pending', studentId: req.userId }).distinct('slot');
    const availableSlots = freeSlots.filter(slot => !bookedSlots.includes(slot));

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

    const session = new Session({ studentId, slot });
    await session.save();

    res.json({ message: `Session booked for ${slot}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getFreeSessions, bookSession };
