const express = require('express');
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware.authenticate);

router.get('/free-sessions', studentController.getFreeSessions);
router.post('/book-session', studentController.bookSession);

module.exports = router;
