const Session = require('../models/sessionModel');

const getPendingSessions = async (req, res) => {
  try {
    if (req.userRole !== 'dean') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const pendingSessions = await Session.find({ status: 'pending' }).populate('studentId', 'universityId');
    res.json({ pendingSessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getPendingSessions };
