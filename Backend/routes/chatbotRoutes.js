const express = require('express');
const { handleStudentQuery } = require('../controllers/chatbotController'); // ✅ NAMED import in CommonJS

const router = express.Router();

router.post('/ask', async (req, res) => {
  try {
    await handleStudentQuery(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
