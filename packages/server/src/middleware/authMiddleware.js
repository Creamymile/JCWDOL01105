// middlewares/authenticate.js

const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticate = async (req, res, next) => {
  try {
    // Dapatkan token dari header
    const token = req.header('Authorization').replace('Bearer ', '');

    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Cari pengguna berdasarkan ID dalam token
    const user = await User.findOne({
      where: { id: decoded.id, new_password: null },
    });

    if (!user) {
      throw new Error();
    }

    // Tambahkan informasi pengguna ke request
    req.user = user;

    next(); // Lanjutkan ke endpoint
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: 'Tidak dapat mengakses. Harap autentikasi.',
    });
  }
};

module.exports = authenticate;
