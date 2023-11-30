const { google } = require('googleapis');
const { User, User_Profile } = require('../models');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const user_profile = require('../models/user_profile');
dotenv.config();

const Oauth2Controller = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:8080/api/auth/google/callback',
);

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

exports.googleLogin = async (req, res) => {
  const url = Oauth2Controller.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true,
  });
  res.redirect(url);
};

exports.googleCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const { tokens } = await Oauth2Controller.getToken(code);
    Oauth2Controller.setCredentials(tokens);

    const oauth2 = google.oauth2({
      version: 'v2',
      auth: Oauth2Controller,
    });

    const { data } = await oauth2.userinfo.get();

    if (!data.email || !data.name) {
      return res.json({
        data: data,
      });
    }

    let user = await User.findOne({ where: { email: data.email } });

    if (!user) {
      user = await User.create({
        name: data.name,
        email: data.email,
        address: '-',
      });
      await User_Profile.create({
        user_id: user.id,
      });
      console.log(data.profile);

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      const secret = process.env.JWT_SECRET;

      const expires = 60 * 60 * 1;

      const token = jwt.sign(payload, secret, { expiresIn: expires });

      return res.redirect(
        'http://localhost:3000/auth/google/callback?token=' + token,
      );
    }

    // Jika pengguna sudah ada, buat token dan kirim ke frontend
    const payload = {
      id: user?.id,
      name: user?.name,
      email: user?.email,
    };

    const secret = process.env.JWT_SECRET;

    const expires = 60 * 60 * 1;

    const token = jwt.sign(payload, secret, { expiresIn: expires });

    return res.redirect(
      'http://localhost:3000/user/googleCallback?token=' + token,
      // 'http://localhost:3000/',
    );
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};
