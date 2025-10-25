const express = require('express');
const router = express.Router();
const predictController = require('../controllers/predictController');
const verifyToken = require('../utils/verifyToken');

router.post('/', verifyToken, predictController.predict);
router.post('/recommend', verifyToken, predictController.getRecommendation);

module.exports = router;