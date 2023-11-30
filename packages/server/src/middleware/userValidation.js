const { User } = require('../models');
const { body, check, validationResult } = require('express-validator');

const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      console.log('val', result);
      console.log('req.body', req.body);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({
      errors: errors.array().map((error) => ({
        msg: error.msg,
        param: error.param,
        location: error.location,
      })),
    });
  };
};

const userValidationRegister = () => {
  return validate([
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
      .isEmail()
      .withMessage('Invalid email format')
      .notEmpty()
      .withMessage('Email is required')
      .custom(async (value) => {
        const user = await User.findOne({ where: { email: value } });
        if (user) {
          throw new Error('Email already in use');
        }
        return true;
      }),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/[A-Z]/)
      .withMessage('Password must have at least 1 uppercase letter')
      .matches(/[a-z]/)
      .withMessage('Password must have at least 1 lowercase letter')
      .matches(/\d/)
      .withMessage('Password must have at least 1 number')
      .notEmpty()
      .withMessage('Password is required'),
    body('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords must match');
        }
        return true;
      })
      .notEmpty()
      .withMessage('Confirm password is required'),
    body('phone_number')
      .matches(/^\d{11,12}$/)
      .withMessage('Phone number must be 11 or 12 digits')
      .notEmpty()
      .withMessage('Phone number is required'),
  ]);
};

const isEmailOrPhoneNumber = (value) => {
  // Cek apakah input adalah email
  if (/^\S+@\S+\.\S+$/.test(value)) {
    return 'email';
  }

  // Cek apakah input adalah nomor telepon (contoh sederhana: hanya angka dan panjang 10-12 karakter)
  if (/^\d{10,12}$/.test(value)) {
    return 'phone_number';
  }

  return false;
};

const userValidationLogin = () => {
  return validate([
    check('email_or_phone')
      .custom((value, { req }) => {
        const type = isEmailOrPhoneNumber(value);
        if (!type) {
          throw new Error('Invalid email or phone_number format');
        }
        req.body.email_or_phone_type = type;
        return true;
      })
      .optional(), // Mengubah menjadi opsional agar tidak wajib diisi
    check('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/[A-Z]/)
      .withMessage('Password must have at least 1 uppercase letter')
      .matches(/[a-z]/)
      .withMessage('Password must have at least 1 lowercase letter')
      .matches(/\d/)
      .withMessage('Password must have at least 1 number')
      .notEmpty()
      .withMessage('Password is required'),
  ]);
};

const userProfileValidation = () => {
  return validate([
    check('name').optional().notEmpty().withMessage('Name is required'),

    check('email')
      .optional()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email format'),

    check('gender')
      .optional()
      .notEmpty()
      .withMessage('Gender is required')
      .isIn(['Male', 'Female', 'Other'])
      .withMessage('Invalid gender'),

    check('birthday')
      .optional()
      .notEmpty()
      .withMessage('Birthday is required')
      .isDate({ format: 'YYYY-MM-DD' })
      .withMessage('Invalid date format. Use YYYY-MM-DD'),
  ]);
};

module.exports = {
  userValidationRegister,
  userValidationLogin,
  userProfileValidation,
};
