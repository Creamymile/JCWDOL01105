const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN, // Pastikan format yang benar
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  // Set cookie options
  res.cookie('jwt', token, cookieOptions);

  // Send response to client with token
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
    },
  });
};

module.exports = {
  signToken,
  createSendToken,
};
