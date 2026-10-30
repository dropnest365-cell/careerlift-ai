const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. Serve static files (HTML, CSS, JS, images) from the project root
app.use(express.static(path.join(__dirname)));

// --- YOUR API ROUTES GO HERE ---
// e.g., app.post('/api/career-lift', (req, res) => { ... });


// 2. Fallback route to serve index.html for any non-API requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Export the app for Vercel serverless deployment
module.exports = app;

// Local development listening check
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}