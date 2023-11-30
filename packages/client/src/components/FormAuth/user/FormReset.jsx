'use client';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { useFormik } from 'formik';
import api from '../../../config/api';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

YupPassword(Yup);
const validationLogin = Yup.object().shape({
  password: Yup.string()
    .minUppercase(1, 'Password must have at least 1 uppercase')
    .minLowercase(1, 'Password must have at least 1 lowercase')
    .minNumbers(1, 'Password must have at least 1 number')
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
});

const FormForgotPassword = ({ showToast }) => {
  const router = useRouter();
  const [token, setToken] = useState('');

  useEffect(() => {
    const tokenFromUrl = window.location.href.split('/').pop();
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
    console.log(token);
  }, []);

  const formik = useFormik({
    initialValues: {
      token: token,
      password: '',
    },
    validationSchema: validationLogin,
    onSubmit: async (values) => {
      console.log('values', values);
      try {
        const response = await api.post('/auth/reset-password', {
          token,
          newPassword: values.password,
        });
        console.log('Success create new password', response.data);
        if (response && response.status === 200) {
          console.log('Success create new password', response.data);
          showToast('Success create new password', 'success');
          setTimeout(() => {
            router.push('/user/login');
            setTimeout(() => {
              toast.dismiss();
            }, 1000);
          }, 1000);
        } else {
          console.error('Cannot create new password', response.data.message);
          showToast(response.data.message, 'error');
        }
      } catch (error) {
        console.error(
          'Cannot create new password',
          error.response.data.message,
        );
        showToast(`Error: ${error.response.data.message}`, 'error');
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-full">
      <form
        className="bg-white shadow-md mb-20 px-8 py-6 rounded-xl space-y-4 max-w-md bg-opacity-90 backdrop-blur-md"
        onSubmit={formik.handleSubmit}
        style={{
          width: '400px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Create a New Password
        </h2>
        <div>
          <label
            htmlFor="password"
            className="block text-sm  text-color-pallete3"
          >
            New Password
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
            className="mt-5 w-full rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm bg-color-pallete3 hover:bg-color-pallete2 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormForgotPassword;
