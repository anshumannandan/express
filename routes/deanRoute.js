const express = require('express');
const deanController = require('../controllers/deanController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware.authenticate);

router.get('/pending-sessions', deanController.getPendingSessions);
router.post('/create-sessions', deanController.createAvailableSessions);

module.exports = router;
