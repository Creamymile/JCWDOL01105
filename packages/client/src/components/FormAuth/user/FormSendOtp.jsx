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
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
});

const FormsendOtp = ({ showToast }) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationLogin,
    onSubmit: async (values) => {
      try {
        const response = await api.post('/auth/resend', {
          email: values.email,
        });
        console.log('Send Otp Success', response.data);
        if (response && response.status === 200) {
          console.log('Success Send Otp');
          showToast('Success Send Otp', 'success');
          setTimeout(() => {
            router.push('/user/verify');
            setTimeout(() => {
              toast.dismiss();
            }, 1000);
          }, 1000);
        } else {
          console.error('Send Otp Failed', response.data.message);
          showToast(response.data.message, 'error');
        }
      } catch (error) {
        console.error('Send Otp Failed', error.response.data.message);
        showToast(`Send Otp Failed: ${error.response.data.message}`, 'error');
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
          Get Your Activation OTP
        </h2>
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

export default FormsendOtp;
