const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Security and utility middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', ai: 'Active' });
});

// Fallback response for unhandled API routes
app.use((req, res) => {
  res.status(404).json({ error: 'API Endpoint not found.' });
});

module.exports = app;