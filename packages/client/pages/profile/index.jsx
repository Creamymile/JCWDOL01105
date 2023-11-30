import React, { useEffect, useState } from 'react';
import bg from '../../public/bg-profile.jpg';
import ProfilePicture from '../../src/components/Profile/ProfilePicture';
import ChangePassword from '../../src/components/Profile/ChangePassword';
import UserProfile from '../../src/components/Profile/UserProfile';
import Navbar from '../../src/components/Navbar/Navbar';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const ProfilePage = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);

  const showToast = (message, type) => {
    if (type === 'success') {
      toast.success(message, { position: toast.POSITION.TOP_CENTER });
    } else if (type === 'error') {
      toast.error(message, { position: toast.POSITION.TOP_CENTER });
    } else {
      toast(message, { position: toast.POSITION.TOP_CENTER });
    }
  };

  useEffect(() => {
    const isGoogleLogin = localStorage.getItem('isGoogleLogin') === 'true';
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthorized(true);
    }

    if (isGoogleLogin) {
      setIsGoogleLogin(true);
    }
  }, []);

  const handlePasswordChange = () => {
    if (isGoogleLogin) {
      showToast('You cannot change your password with google account', 'error');
    }
  };

  if (!isAuthorized) {
    return (
      <div>
        <Navbar />
        <div className="bg-gray-100 h-screen flex justify-center items-center">
          <div className="bg-white p-8 rounded-md shadow-md">
            <h1 className="text-3xl font-bold mb-4 text-center">
              No Authorization <br />
              <span className="text-color-danger">Error 404</span>
            </h1>
            <p className="text-lg text-gray-600 text-center">
              Please log in to access this page.
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"
              onClick={() => router.push('/user/login')}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <div>
        <div
          className="mt-8  bg-color-pallete1 container mx-auto border border-gray-300 p-4 rounded-md mb-5"
          //   style={{ backgroundImage: `url(${bg.src})` }}
        >
          <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
          <ProfilePicture showToast={showToast} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <UserProfile showToast={showToast} />
            </div>
            <div>
              {!isGoogleLogin && (
                <ChangePassword
                  showToast={showToast}
                  isGoogleLogin={isGoogleLogin}
                  onChangePassword={handlePasswordChange}
                />
              )}
              {isGoogleLogin && (
                <div className="bg-gray-100 shadow sm:rounded-lg p-6 mt-5">
                  <p>
                    Change Password feature is not available for Google
                    logged-in users.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
