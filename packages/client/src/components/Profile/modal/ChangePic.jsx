import React, { useState } from 'react';
import api from '../../../config/api';

const ChangeProfileImage = ({ onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError(null);
  };

  const handleUpload = () => {
    if (selectedFile) {
      setUploading(true);
      const formData = new FormData();
      formData.append('profilePicture', selectedFile);
      api
        .post('/profile/upload', formData)
        .then((response) => {
          setUploading(false);
          onClose();
        })
        .catch((error) => {
          setUploading(false);
          setError('Gagal mengunggah gambar. Silakan coba lagi.');
          console.error('Cannot upload image', error.response);
        });
    }
  };

  return (
    <div className="fixed inset-0 z-auto overflow-auto bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white shadow-md mb-20 px-8 py-6 rounded-xl space-y-4 max-w-md bg-opacity-90 backdrop-blur-md">
        <div>
          <h1 className="text-2xl font-bold">Ubah gambar Anda</h1>
          <input type="file" onChange={handleFileChange} />
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 mr-2"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? 'Mengunggah...' : 'Unggah'}
          </button>
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            onClick={onClose}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfileImage;
