const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mock database
let users = [];
let workouts = [];
let nutritionLogs = [];
let appointments = [];

// API Routes
// User endpoints
app.post('/api/users', (req, res) => {
  const user = {
    id: Date.now(),
    ...req.body
  };
  users.push(user);
  res.status(201).json(user);
});

// Workout endpoints
app.post('/api/workouts', (req, res) => {
  const workout = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date()
  };
  workouts.push(workout);
  res.status(201).json(workout);
});

app.get('/api/workouts', (req, res) => {
  res.json(workouts);
});

// Nutrition endpoints
app.post('/api/nutrition', (req, res) => {
  const entry = {
    id: Date.now(),
    ...req.body,
    loggedAt: new Date()
  };
  nutritionLogs.push(entry);
  res.status(201).json(entry);
});

// Appointment endpoints
app.post('/api/appointments', (req, res) => {
  const appointment = {
    id: Date.now(),
    ...req.body,
    bookedAt: new Date()
  };
  appointments.push(appointment);
  res.status(201).json(appointment);
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

document.querySelectorAll('.theme-option').forEach(option => {
  option.addEventListener('click', function() {
      document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('selected'));
      this.classList.add('selected');
      const theme = this.getAttribute('data-theme');
      document.body.classList.toggle('bg-gray-900', theme === 'dark');
      document.body.classList.toggle('text-white', theme === 'dark');
      localStorage.setItem('theme', theme); // Save theme
  });
});

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
      document.querySelector('[data-theme="dark"]').classList.add('selected');
      document.body.classList.add('bg-gray-900', 'text-white');
  }
});
