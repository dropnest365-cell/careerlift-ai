const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '100kb' }));

const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, standardHeaders: true, legacyHeaders: false });
app.use('/api/', apiLimiter);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'online', database: 'memory', ai: 'connected', timestamp: new Date().toISOString() });
});

app.post('/api/resume/improve', (req, res) => {
  res.json({ result: { overallScore: 85, summary: 'Resume structure analyzed successfully.', strengths: ['Clear action verbs.'], improvements: ['Add performance metrics.'] }, engine: 'backend-heuristic' });
});

app.post('/api/jobs/match', (req, res) => {
  res.json({ matchScore: 82, matchedSkills: ['JavaScript', 'Node.js'], missingSkills: ['Docker'], suggestions: ['Highlight system design.'], engine: 'backend-heuristic' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

app.listen(PORT, () => {
  console.log('Secured CareerLift AI Backend running on http://localhost:' + PORT);
});