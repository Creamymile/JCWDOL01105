import React, { useEffect, useState } from 'react';
import dinamic from 'next/dynamic';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../../config/api';

const DatePicker = dinamic(() => import('react-datepicker'));

const UserProfile = ({ showToast }) => {
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState('');
  const [birthday, setBirthDay] = useState(new Date());
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');

  const getUserData = async () => {
    try {
      const response = await api.get('/profile');
      const data = await response.data.data;
      setName(data.name);
      setBirthDay(new Date(data.birthday));
      setGender(data.gender);
      setEmail(data.email);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserData = async () => {
    try {
      const response = await api.post('/profile', {
        name,
        birthday: birthday.toISOString().split('T')[0],
        gender,
        email,
      });
      showToast('Update Success', 'success');
      return response.data;
    } catch (error) {
      console.log(error.response || error.message);
      throw error;
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleEdit = async () => {
    if (editable) {
      await updateUserData();
    }
    setEditable(!editable);
  };

  const handleGenderChange = (selectedValue) => {
    const convertedGender = selectedValue === 'Male' ? 'Male' : 'Female';
    setGender(convertedGender);
  };

  const sensorEmail = (email) => {
    const atIndex = email.indexOf('@');
    if (atIndex !== -1) {
      const maskedPart = email.slice(1, atIndex).replace(/\S/g, '*');
      return email[0] + maskedPart + email.slice(atIndex);
    }
    return email;
  };
  const censoredEmail = sensorEmail(email);

  return (
    <div className="bg-white shadow sm:rounded-lg p-6 mt-5">
      <div className="mt-2 sm:rounded-lg p-6 mt-5px-4 py-5 sm:px-6 sm:text-left">
        <div className="ext-sm sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-4 items-center">
          <h2 className="text-lg font-semibold">Change Your Bio</h2>
          <dd className="text-right">
            <button className="text-blue-500" onClick={handleEdit}>
              {editable ? 'Save' : 'Edit'}
            </button>
          </dd>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="flex justify-between items-center py-3 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium">Name</dt>
            <div className="mt-1 text-sm sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-4 items-center">
              <dd className="sm:text-left">
                {editable ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded-md px-2 py-1 w-full"
                  />
                ) : (
                  <span>{name}</span>
                )}
              </dd>
            </div>
          </div>

          <div className="flex justify-between items-center py-3 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium">Date of Birth</dt>
            <div className="mt-1 text-sm sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-4 items-center">
              <dd className="sm:text-left">
                {editable ? (
                  <DatePicker
                    selected={birthday}
                    onChange={(date) => setBirthDay(date)}
                    className="border rounded-md px-2 py-1 w-full"
                  />
                ) : (
                  <span>{birthday.toLocaleDateString(`id-ID`)}</span>
                )}
              </dd>
            </div>
          </div>

          <div className="flex justify-between items-center py-3 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium">Gender</dt>
            <div className="mt-1 text-sm sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-4 items-center">
              <dd className="sm:text-left">
                {editable ? (
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        value="Male"
                        checked={gender === 'Male'}
                        onChange={() => handleGenderChange('Male')}
                        className="form-radio h-4 w-4 text-indigo-600"
                      />
                      <span className="ml-2">Male</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        value="Female"
                        checked={gender === 'Female'}
                        onChange={() => handleGenderChange('Female')}
                        className="form-radio h-4 w-4 text-indigo-600"
                      />
                      <span className="ml-2">Female</span>
                    </label>
                  </div>
                ) : (
                  <span>{gender}</span>
                )}
              </dd>
            </div>
          </div>
        </dl>
      </div>

      {/* Change Contact */}
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg font-semibold">Change Contact</h2>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200"></dl>
        <div className="flex justify-between items-center py-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm font-medium">Email</dt>
          <div className="mt-1 text-sm sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-4 items-center">
            <dd className="sm:text-left">
              {editable ? (
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded-md px-2 py-1 w-full"
                />
              ) : (
                <span>{censoredEmail}</span>
              )}
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
