const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../utils/verifyToken');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/verify', verifyToken, authController.verifyToken);

module.exports = router;