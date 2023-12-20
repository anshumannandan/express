const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoute');
const deanRoutes = require('./routes/deanRoute');
const studentRoutes = require('./routes/studentRoute');

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/university');

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/dean', deanRoutes);
app.use('/student', studentRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
