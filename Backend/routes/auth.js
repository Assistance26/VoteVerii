// routes/auth.js
const express = require('express');
const router = express.Router();
const verifyFirebaseToken = require('../middleware/auth');
const { syncUser } = require('../controllers/auth');

router.post('/sync', verifyFirebaseToken, syncUser);


module.exports = router;
