// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/pose-data', (req, res) => {
  const poseData = req.body;
  console.log('Received Pose Data:', poseData);

  // Here you can save it to a database or run analysis
  res.json({ message: 'Pose data received successfully!' });
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
