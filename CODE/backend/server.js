const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'supersecretkey'; // Replace with a secure key

// MongoDB connection
mongoose.connect('mongodb+srv://sahilkumar23cse:12345@uip.ifblf.mongodb.net', {
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Schemas and Models
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  history: [{
    title: String,
    description: String,
    image: String,
    url: String,
  }],
});

const User = mongoose.model('User', userSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes

// Signup route
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, history: [] });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add movie to history
app.post('/history', async (req, res) => {
  const { email, movie } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $addToSet: { history: movie } }, // Avoid duplicate entries
      { new: true }
    );
    res.status(200).json({ message: 'Movie added to history', history: user.history });
  } catch (error) {
    res.status(500).json({ error: 'Error updating history' });
  }
});

// Get user history
app.get('/history', async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user.history);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching history' });
  }
});

// Remove movie from history
app.delete('/history', async (req, res) => {
  const { email, movieTitle } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $pull: { history: { title: movieTitle } } },
      { new: true }
    );
    res.status(200).json({ message: 'Movie removed from history', history: user.history });
  } catch (error) {
    res.status(500).json({ error: 'Error removing movie from history' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
