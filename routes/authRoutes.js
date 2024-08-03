const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

//router.use(protect);
router.post('/register',registerUser);
router.post('/login',protect,loginUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;