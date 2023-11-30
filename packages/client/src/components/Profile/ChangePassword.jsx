import React, { useState } from 'react';
import api from '../../config/api';

const ChangePassword = ({ showToast }) => {
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/change-password', {
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
        confirmNewPassword: passwords.confirmNewPassword,
      });
      setPasswords({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
      setEditMode(false);
      showToast(response.data.message, 'success');
    } catch (error) {
      showToast(error.response.data.message);
    }
  };

  const handleCancel = () => {
    setPasswords({
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });
    setEditMode(false);
  };

  return (
    <div className="bg-gray-100 shadow sm:rounded-lg p-6 mt-5">
      {!editMode && (
        <button
          type="button"
          onClick={handleEdit}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Change Password
        </button>
      )}
      {editMode && (
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label htmlFor="oldPassword" className="block font-semibold mb-1">
              Old Password:
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={passwords.oldPassword}
              onChange={handleChange}
              className="border border-gray-400 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
              placeholder="Enter old password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block font-semibold mb-1">
              New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              className="border border-gray-400 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
              placeholder="Enter new password"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmNewPassword"
              className="block font-semibold mb-1"
            >
              Confirm New Password:
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={passwords.confirmNewPassword}
              onChange={handleChange}
              className="border border-gray-400 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
              placeholder="Confirm new password"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default ChangePassword;
