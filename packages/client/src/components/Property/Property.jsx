'use client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { API_URL } from '../../config/api';
import axios from 'axios';

const Property = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [sell, setSell] = useState(false);
  const [rent, setRent] = useState(false);
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [regularPrice, setRegularPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [offer, setOffer] = useState(false);
  const [furnished, setFurnished] = useState(false);
  const [parking, setParking] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !description ||
      !address ||
      !bedrooms ||
      !bathrooms ||
      !regularPrice ||
      (!offer && discountPrice !== 0) ||
      (offer && !discountPrice) ||
      files.length === 0 ||
      files.length > 6
    ) {
      setErrorMessage('Please fill in all the required fields.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return;
    }

    if (regularPrice < discountPrice) {
      return setErrorMessage(
        'Discount price must be lower than regular price.',
        setTimeout(() => {
          setErrorMessage('');
        }, 3000),
      );
    }

    if (files.length === 0) {
      setErrorMessage('Please upload at least one image.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return;
    }

    if (files.length > 6) {
      setErrorMessage('You can only upload up to 6 images.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return;
    }
    setErrorMessage('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('address', address);
    formData.append('type', rent);
    formData.append('bedrooms', bedrooms);
    formData.append('bathrooms', bathrooms);
    formData.append('regularPrice', regularPrice);
    formData.append('disc', discountPrice);
    formData.append('parking', parking);
    formData.append('furnished', furnished);

    if (offer === true) {
      formData.append('offer', offer);
      formData.append('discountPrice', discountPrice);
    }

    files.forEach((file) => {
      formData.append('images', file);
    });

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/property`, formData);
      const responseData = response.data;
      console.log('Response Data :', responseData);

      if (responseData.success === false) {
        setErrorMessage(responseData.message);
        return;
      }

      setFiles([]);
      setName('');
      setDescription('');
      setAddress('');

      setTimeout(() => {
        setLoading('');
        router.push(`/property`);
      }, 3000);
    } catch (error) {
      console.error('Error', error);

      if (error.response) {
        console.log('Error response:', error.response);
      }
    }
  };

  const handleDeleteImage = (index) => {
    const newImages = [...files];
    newImages.splice(index, 1);
    setFiles(newImages);
  };

  const renderImagePreviews = () => {
    return files.map((file, index) => (
      <div key={index} className="flex gap-4">
        <img
          src={URL.createObjectURL(file)}
          alt={`Selected Image ${index + 1}`}
          className="w-20 h-20 rounded-lg "
        />
        <button
          onClick={() => handleDeleteImage(index)}
          className="absolute w-1 h-1 bg-color-dark text-white rounded-lg hover:opacity-95"
        >
          x
        </button>
      </div>
    ));
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleChange = (e) => {
    const checkboxId = e.target.id;

    if (checkboxId === 'sell') {
      setSell(true);
      setRent(false);
    } else if (checkboxId === 'rent') {
      setSell(false);
      setRent(true);
    } else if (checkboxId === 'parking') {
      setParking(!parking);
    } else if (checkboxId === 'furnished') {
      setFurnished(!furnished);
    } else if (checkboxId === 'offer') {
      setDiscountPrice(0);
      setOffer((prevOffer) => !prevOffer);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Rent Your Property
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="6"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="Address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sell"
                className="w-5"
                onChange={handleChange}
                checked={sell}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={rent}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                checked={parking}
                onChange={handleChange}
              />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                checked={furnished}
                onChange={handleChange}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                checked={offer}
                onChange={handleChange}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="7"
                required
                className="p-3 border border-color-neutral rounded-lg"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="7"
                required
                className="p-3 border border-color-neutral rounded-lg"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
              />
              <p>Bath</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="150000"
                max=""
                required
                className="p-3 border border-color-neutral rounded-lg"
                value={regularPrice}
                onChange={(e) => setRegularPrice(e.target.value)}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">(Rp / Month)</span>
              </div>
            </div>
            {offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max=""
                  required
                  className="p-3 border border-color-neutral rounded-lg"
                  value={discountPrice}
                  onChange={(e) => setDiscountPrice(e.target.value)}
                />
                <div className="flex flex-col items-center">
                  <p>Discounted price</p>
                  <span className="text-xs">(Rp / Month)</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold ">
            Images :
            <span className="font-normal text-color-neutral ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className=" flex gap-4">
            <input
              onChange={handleFileChange}
              className="p-3 border border-color-neutral rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
          </div>

          <div className="flex">
            {files.length > 0 && renderImagePreviews()}
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="p-3 bg-color-pallete1 text-color-primary rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? 'Creating your listing ...' : 'Create Listing'}
          </button>
          {errorMessage && (
            <p className="text-color-red font-semibold text-lg">
              {errorMessage}
            </p>
          )}
        </div>
      </form>
    </main>
  );
};

export default Property;
