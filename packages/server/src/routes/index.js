const express = require('express');
const router = express.Router();
const authRouter = require('../routes/authRouter');
const profileRouter = require('../routes/profileRouter');

router.use('/auth', authRouter);

router.use('/profile', profileRouter);

module.exports = router;
