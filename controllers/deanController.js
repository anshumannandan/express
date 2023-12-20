const Session = require('../models/sessionModel');
const moment = require('moment');

const getPendingSessions = async (req, res) => {
  try {
    if (req.userRole !== 'dean') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const currentTime = new Date();

    const pendingSessions = await Session.find({
      status: 'pending',
      slot: { $gte: currentTime },
    }).populate('studentId', 'universityId');

    res.json({ pendingSessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createAvailableSessions = async (req, res) => {
  try {
    if (req.userRole !== 'dean') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Check if sessions for the current week already exist
    const existingSessions = await Session.findOne({
      status: 'available',
      slot: {
        $gte: moment().startOf('isoWeek').toDate(),
        $lte: moment().endOf('isoWeek').toDate(),
      },
    });

    if (existingSessions) {
      return res.status(400).json({ message: 'Sessions for the current week already exist' });
    }

    // Calculate the next Thursday and Friday at 10 AM
    const now = moment();
    let nextThursday = now.clone().startOf('isoWeek').add(3, 'days').hour(10).minute(0).second(0);
    if (now.isAfter(nextThursday)) {
      nextThursday = nextThursday.add(7, 'days');
    }

    let nextFriday = nextThursday.clone().add(1, 'day');

    // Create sessions
    const thursdaySession = new Session({
      slot: nextThursday.toDate(),
      status: 'available',
    });

    const fridaySession = new Session({
      slot: nextFriday.toDate(),
      status: 'available',
    });

    await thursdaySession.save();
    await fridaySession.save();

    res.json({ message: 'Available sessions for the current week created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getPendingSessions, createAvailableSessions };
