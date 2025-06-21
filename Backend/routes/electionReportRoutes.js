const express = require('express');
const { getSummaryFromOllama } = require('../services/electionSummaryService');

const router = express.Router();

router.post('/summarize', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    res.status(400).json({ error: 'Prompt is required' });
    return;
  }

  try {
    const summary = await getSummaryFromOllama(prompt);
    res.json({ summary }); // no return needed here
  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
});

module.exports = router;
