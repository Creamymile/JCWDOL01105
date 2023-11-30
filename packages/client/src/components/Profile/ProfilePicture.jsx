import React, { useEffect, useState } from 'react';
import api from '../../config/api';
import ChangePic from './modal/ChangePic';

const ProfilePicture = ({ showToast }) => {
  const [profilePicture, setProfilePicture] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal); // Mengubah nilai state untuk menampilkan/sembunyikan modal
  };

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await api.get('/profile/picture');
        const data = await response.data;
        setProfilePicture(data.profile_picture);
      } catch (error) {
        console.error('Failed to fetch profile picture', error);
      }
    };
    fetchProfilePicture();
  }, []);

  const updateProfilePicture = async () => {
    try {
      const response = await api.get('/profile/picture');
      const data = await response.data;
      console.log(response.data);
      showToast('Update Success', 'success');
      setProfilePicture(data.profile_picture);
    } catch (error) {
      console.error('Failed to update profile picture', error);
    }
  };

  return (
    <div className="bg-white shadow sm:rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Profile Picture</h2>
      <div className="flex items-center justify-center mb-6">
        <img
          src={profilePicture}
          alt="Profile"
          className="rounded-full h-40 w-40 object-cover border-4 border-blue-500"
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleModalToggle}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Change Picture
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <ChangePic
          onClose={() => {
            handleModalToggle();
            updateProfilePicture();
          }}
          showToast={showToast}
        />
      )}
    </div>
  );
};

export default ProfilePicture;
