const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Security and utility middleware
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP
});
app.use(limiter);

// 1. Serve static files (HTML, CSS, JS) from project root
app.use(express.static(path.join(__dirname)));

// 2. API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', ai: 'Active' });
});

// 3. Fallback route to serve index.html for frontend routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// CRITICAL: Export app for Vercel serverless execution
module.exports = app;

// Local development server listener (ignored by Vercel in production)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}