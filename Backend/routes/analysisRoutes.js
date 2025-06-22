const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisResultController');

// Get analysis result by ID
router.get('/:id', analysisController.getAnalysisById);



module.exports = router;