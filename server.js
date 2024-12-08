const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

let users = [];
let transactions = [];

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.post('/register', (req, res) => {
  const { username } = req.body;
  if (users.includes(username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  users.push(username);
  res.status(200).json({ message: 'Registration successful' });
});

app.post('/login', (req, res) => {
  const { username } = req.body;
  if (users.includes(username)) {
    return res.status(200).json({ message: 'Login successful' });
  }
  res.status(400).json({ message: 'User not found' });
});

app.post('/transaction', (req, res) => {
  const { username, transaction } = req.body;
  transactions.push({ username, ...transaction });
  res.status(201).json({ message: 'Transaction added' });
});

app.get('/transactions', (req, res) => {
  const { username } = req.query;
  const userTransactions = transactions.filter((t) => t.username === username);
  res.status(200).json(userTransactions);
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
