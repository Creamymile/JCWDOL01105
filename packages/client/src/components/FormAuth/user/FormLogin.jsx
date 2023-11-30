'use client';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import AuthService from '../../../services/userService';

YupPassword(Yup);
const validationLogin = Yup.object().shape({
  email_or_phone: Yup.string()
    .required('Email / Phone is required')
    .test('email_or_phone', 'Email / Phone is invalid', (value) => {
      return validateEmail(value) || validatePhone(value);
    }),
  password: Yup.string()
    .minUppercase(1, 'Password must have at least 1 uppercase')
    .minLowercase(1, 'Password must have at least 1 lowercase')
    .minNumbers(1, 'Password must have at least 1 number')
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
});

const validateEmail = (email) => {
  return Yup.string().email().isValidSync(email);
};

const validatePhone = (phone) => {
  return Yup.string()
    .matches(/^\d{8,14}$/, 'Invalid phone number format')
    .isValidSync(phone);
};

const FormLogin = ({ showToast }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email_or_phone: '',
      password: '',
    },
    validationSchema: validationLogin,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const { email_or_phone, password } = values;
        const loginResult = await AuthService.login(email_or_phone, password);
        if (loginResult && loginResult.success) {
          console.log('Login Success');
          showToast('Login Success', 'success');
          setTimeout(() => {
            router.push('/');
            setTimeout(() => {
              toast.dismiss();
            }, 1000);
          }, 1000);
        } else {
          console.error('Login Failed', loginResult.message);
          showToast(`${loginResult.message}`, 'error');
        }
      } catch (error) {
        console.error('Login Failed', error.message);
        showToast(`Login Failed: ${error.message}`, 'error');
      } finally {
        setLoading(false);
      }
    },
  });

  const googleAuth = () => {
    window.open('http://localhost:8080/api/auth/google', '_self');
  };

  const handleGoogleAuthSuccess = () => {
    // Lakukan permintaan ke endpoint yang menangani autentikasi Google
    // Misalnya menggunakan fetch atau XMLHttpRequest
    fetch('/auth/google/callback')
      .then((response) => response.json()) // Mengambil respons dalam format JSON
      .then((data) => {
        // Menyimpan data pengguna ke localStorage
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('token', data.token);
        console.log('Data pengguna berhasil disimpan di localStorage:', data);
        // Lakukan tindakan lain yang Anda butuhkan setelah menyimpan data, misalnya redirect atau menampilkan pesan ke pengguna
      })
      .catch((error) => {
        console.error(
          'Terjadi kesalahan dalam mengambil data pengguna:',
          error,
        );
        // Handle kesalahan jika ada
      });
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form
        className="bg-white shadow-md mb-20 px-8 py-6 rounded-xl space-y-4 max-w-md bg-opacity-90 backdrop-blur-md"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Create New User
        </h2>
        <div>
          <label htmlFor="email" className="block text-sm  text-color-pallete3">
            Email address
          </label>
          <input
            id="email_or_phone"
            name="email_or_phone"
            type="text"
            placeholder="email or phone number"
            autoComplete="email_or_phone"
            required
            value={formik.values.email_or_phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {formik.touched.email_or_phone && formik.errors.email_or_phone ? (
            <div className="text-red-500">{formik.errors.email_or_phone}</div>
          ) : null}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm  text-color-pallete3"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            autoComplete="current-password"
            required
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
          ) : null}
        </div>
        <div>
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:outline-none"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
          <div className="flex items-center justify-center mb-2">
            <hr className="w-1/4 border-t border-gray-300" />
            <p className="mx-3 text-gray-300 text-sm">OR</p>
            <hr className="w-1/4 border-t border-gray-300" />
          </div>
          <div className="px-6 sm:px-0 max-w-sm">
            <button
              type="button"
              onClick={googleAuth}
              className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
            >
              <svg
                className="mr-2 -ml-1 w-4 h-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Sign in and Sign up with Google<div></div>
            </button>
          </div>
          <div className="flex justify-center items-center mt-6 text-sm text-color-primary">
            <span className="ml-2">
              Not a member?
              <span
                onClick={() => router.push('/user/register')}
                className="ml-2 text-green-500 font-semibold hover:underline cursor-pointer text-color-pallete3"
              >
                Register here
              </span>
            </span>
          </div>
          <div className="flex justify-center items-center mt-6 text-sm text-color-primary">
            <span className="ml-2">
              If Your Account is not activated
              <span
                onClick={() => router.push('/user/resend')}
                className="ml-2 text-green-500 font-semibold hover:underline cursor-pointer text-color-pallete3"
              >
                Resend OTP
              </span>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormLogin;
