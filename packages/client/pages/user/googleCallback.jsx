// pages/auth/google-callback.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const GoogleCallbackPage = () => {
  const router = useRouter();
  const [loadingText, setLoadingText] = useState('Loading...');

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token');

    if (token) {
      const timeout = setTimeout(() => {
        localStorage.setItem('token', token);
        localStorage.setItem('isGoogleLogin', true);
        router.push('/');
      }, 1500);

      const dotsInterval = setInterval(() => {
        setLoadingText((prevText) =>
          prevText === 'Loading...' ? 'Loading' : prevText + '.',
        );
      }, 300);

      return () => {
        clearTimeout(timeout);
        clearInterval(dotsInterval);
      };
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-xl font-semibold mb-4">{loadingText}</div>
      {/* Animasi atau elemen lain untuk menampilkan loading */}
      <div className="loader"></div>
    </div>
  );
};

export default GoogleCallbackPage;
