const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadPic');
const userController = require('../controllers/userController');


router.get('/profile', auth.protect, userController.getUserProfile);

router.post('/upload-profile-pic', auth.protect, upload, userController.uploadPicture);

router.get('/profile-pic', auth.protect, userController.getPicture);

module.exports = router;
