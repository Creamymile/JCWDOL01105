const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');
const { userProfileValidation } = require('../middleware/userValidation');
const { uploadOptions } = require('../utils/uploadProfilePicture');

router.post(
  '/',
  authMiddleware,
  userProfileValidation(),
  profileController.updateOrCreateProfile,
);

router.get('/', authMiddleware, profileController.getProfile);

router.get('/picture', authMiddleware, profileController.getProfilePicture);

router.post(
  '/upload',
  authMiddleware,
  uploadOptions.single('profilePicture'),
  profileController.uploadProfile,
);

module.exports = router;
