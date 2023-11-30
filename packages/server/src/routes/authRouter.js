const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {
  userValidationRegister,
  userValidationLogin,
} = require('../middleware/userValidation');
const Oauth2Controller = require('../controllers/oauth2Controller');
const authMiddleware = require('../middleware/authMiddleware');

const validateRegister = userValidationRegister();
const validateLogin = userValidationLogin();

router.post('/register', validateRegister, authController.registerUser);
router.post('/login', validateLogin, authController.loginUser);
router.post('/verify', authController.verifyEmailUser);
router.post('/resend', authController.resendVerificationCodeUSer);
router.post('/reset-password/request', authController.requestResetPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/change-password', authMiddleware, authController.changePassword);

router.get('/google', Oauth2Controller.googleLogin);
router.get('/google/callback', Oauth2Controller.googleCallback);

module.exports = router;
