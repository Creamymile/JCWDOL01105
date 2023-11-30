const { User } = require('../models');
const {
  generateVerificationCode,
  mailVerificationCode,
} = require('./sendMail');

const verifyEmail = async (req, res) => {
  try {
    const { verification_code } = req.body;

    console.log('Kode verifikasi yang diterima:', verification_code);

    const user = await User.findOne({ where: { verification_code } });
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'Verifikasi Gagal, Cek Kembali Kode Verifikasi',
      });
    }
    if (user.is_verified) {
      return res.status(400).json({
        status: 'fail',
        message: 'Akun sudah terverifikasi',
      });
    }
    if (user.verification_code !== verification_code) {
      return res.status(400).json({
        status: 'fail',
        message: 'Kode verifikasi tidak cocok',
      });
    }

    const currentDate = new Date();
    if (currentDate > user.verification_expires) {
      return res.status(400).json({
        status: 'fail',
        message: 'Kode verifikasi sudah kedaluwarsa',
      });
    }
    await user.update({ is_verified: true });
    return res.status(200).json({
      status: 'success',
      message: 'Akun berhasil diverifikasi',
    });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    return res.status(500).json({
      status: 'fail',
      message: `Terjadi kesalahan saat memproses permintaan: ${error.message}`,
    });
  }
};

const sendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User tidak ditemukan',
      });
    }
    if (user.is_verified) {
      return res.status(400).json({
        status: 'fail',
        message: 'Akun sudah terverifikasi',
      });
    }
    if (user.verification_attempts >= 5) {
      return res.status(400).json({
        status: 'fail',
        message: 'Maksimal percobaan kirim kode verifikasi telah habis',
      });
    }
    await user.increment('verification_attempts');
    user.verification_code = generateVerificationCode();
    user.verification_expires = new Date(new Date().getTime() + 5 * 60 * 1000);

    await user.save();
    await mailVerificationCode(user.email, user.verification_code);

    return res.status(200).json({
      status: 'success',
      message: 'Kode verifikasi berhasil dikirim ulang',
    });
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    return res.status(500).json({
      status: 'fail',
      message: `Terjadi kesalahan saat memproses permintaan: ${error.message}`,
    });
  }
};

module.exports = {
  verifyEmail,
  sendVerificationCode,
};
