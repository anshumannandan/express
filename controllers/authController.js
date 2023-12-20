const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, 'secret_key', { expiresIn: '1h' });
  return token;
};

const login = async (req, res) => {
  const { universityId, password } = req.body;

  try {
    const user = await User.findOne({ universityId, password });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.json({ token, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { login };
