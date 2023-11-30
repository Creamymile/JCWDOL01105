'use client';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { useFormik } from 'formik';
import api from '../../../config/api';
import { useRouter } from 'next/router';

YupPassword(Yup);
const validationRegister = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .minUppercase(1, 'Password must have at least 1 uppercase')
    .minLowercase(1, 'Password must have at least 1 lowercase')
    .minNumbers(1, 'Password must have at least 1 number')
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  phone_number: Yup.string()
    .required('Phone number is required')
    .matches(/^\d{11,12}$/, 'Phone number must be 11 or 12 digits'),
});

const FormRegister = ({ showToast }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone_number: '',
    },
    validationSchema: validationRegister,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await api.post('/auth/register', {
          name: values.name,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          phone_number: values.phone_number,
        });
        console.log('Register Success', response);
        showToast('Register Success', 'success');
        setTimeout(() => {
          router.push('/user/login');
        }, 3500);
      } catch (error) {
        console.error('Register Failed', error);
        showToast(error.response);
      } finally {
        setLoading(false);
      }
    },
  });

  const googleAuth = () => {
    window.open('http://localhost:8080/api/auth/google', '_self');
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form
        className="bg-white shadow-md px-8 py-6 rounded-xl space-y-4 max-w-md bg-opacity-90 backdrop-blur-md"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Create New User
        </h2>
        <div>
          <label htmlFor="name" className="block text-sm  text-color-pallete3">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="your name"
            autoComplete="name"
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500">{formik.errors.name}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm  text-color-pallete3">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            autoComplete="email"
            required
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
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
          <label
            htmlFor="confirm-password"
            className="block text-sm  text-color-pallete3"
          >
            Confirm Password
          </label>
          <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            placeholder="********"
            autoComplete="new-password"
            required
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="text-red-500">{formik.errors.confirmPassword}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm text-color-pallete3">
            Phone Number
          </label>
          <input
            id="phone_number"
            name="phone_number"
            type="tel"
            placeholder="0857-12xx-xxxx"
            autoComplete="tel"
            required
            value={formik.values.phone_number}
            onChange={(e) => {
              const re = /^[0-9\b]+$/; // Regular expression untuk hanya menerima angka
              if (e.target.value === '' || re.test(e.target.value)) {
                formik.handleChange(e);
              }
            }}
            onBlur={formik.handleBlur}
            className="w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {formik.touched.phone_number && formik.errors.phone_number ? (
            <div className="text-red-500">{formik.errors.phone_number}</div>
          ) : null}
        </div>
        <div>
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:outline-none  text-color-pallete3"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Register'}
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
          <div className="flex justify-center items-center mt-6 text-sm">
            <span className="ml-2">
              Already have an account?
              <span
                onClick={() => router.push('/user/login')}
                className="ml-2 text-green-500 font-semibold hover:underline cursor-pointer text-color-pallete3"
              >
                Login here
              </span>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
