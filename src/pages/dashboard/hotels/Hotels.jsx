import React, { useState } from 'react';
import { FadeIn } from '../../../animations/FadeIn';
import { PlusCircle, Pencil, Trash2, Image as ImageIcon } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

const mockHotels = [
  {
    id: 1,
    name: 'Seaside Resort',
    location: 'Maldives',
    description: 'Luxury beachfront resort with stunning ocean views',
    pricePerNight: 299,
    beachRooms: 20,
    poolRooms: 15,
    standardRooms: 45,
    mainPhoto: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400',
    photos: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=200'
    ]
  }
];

export const HotelsPage = () => {
  const [hotels, setHotels] = useState(mockHotels);
  const [isEditing, setIsEditing] = useState(false);
  const [currentHotel, setCurrentHotel] = useState({
    name: '',
    location: '',
    description: '',
    pricePerNight: '',
    beachRooms: '',
    poolRooms: '',
    standardRooms: '',
    mainPhoto: null,
    photos: []
  });

  const onDrop = (acceptedFiles, type = 'main') => {
    if (type === 'main') {
      setCurrentHotel(prev => ({
        ...prev,
        mainPhoto: Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0])
        })
      }));
    } else {
      const newPhotos = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );
      setCurrentHotel(prev => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos]
      }));
    }
  };

  const { getRootProps: getMainPhotoProps, getInputProps: getMainPhotoInputProps } = useDropzone({
    onDrop: files => onDrop(files, 'main'),
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  const { getRootProps: getPhotosProps, getInputProps: getPhotosInputProps } = useDropzone({
    onDrop: files => onDrop(files, 'additional'),
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setHotels(prev => prev.map(hotel => 
        hotel.id === currentHotel.id ? currentHotel : hotel
      ));
    } else {
      setHotels(prev => [...prev, { ...currentHotel, id: Date.now() }]);
    }
    setCurrentHotel({
      name: '',
      location: '',
      description: '',
      pricePerNight: '',
      beachRooms: '',
      poolRooms: '',
      standardRooms: '',
      mainPhoto: null,
      photos: []
    });
    setIsEditing(false);
  };

  const handleEdit = (hotel) => {
    setCurrentHotel(hotel);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setHotels(prev => prev.filter(hotel => hotel.id !== id));
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Manage Hotels</h2>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Add New Hotel</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">
              {isEditing ? 'Edit Hotel' : 'Add New Hotel'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Hotel Name</label>
                <input
                  type="text"
                  value={currentHotel.name}
                  onChange={(e) => setCurrentHotel(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={currentHotel.location}
                  onChange={(e) => setCurrentHotel(prev => ({ ...prev, location: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={currentHotel.description}
                  onChange={(e) => setCurrentHotel(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price per Night ($)</label>
                <input
                  type="number"
                  value={currentHotel.pricePerNight}
                  onChange={(e) => setCurrentHotel(prev => ({ ...prev, pricePerNight: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Beach Rooms</label>
                  <input
                    type="number"
                    value={currentHotel.beachRooms}
                    onChange={(e) => setCurrentHotel(prev => ({ ...prev, beachRooms: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Pool Rooms</label>
                  <input
                    type="number"
                    value={currentHotel.poolRooms}
                    onChange={(e) => setCurrentHotel(prev => ({ ...prev, poolRooms: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Standard Rooms</label>
                  <input
                    type="number"
                    value={currentHotel.standardRooms}
                    onChange={(e) => setCurrentHotel(prev => ({ ...prev, standardRooms: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Main Photo</label>
                <div
                  {...getMainPhotoProps()}
                  className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 cursor-pointer"
                >
                  <input {...getMainPhotoInputProps()} />
                  {currentHotel.mainPhoto ? (
                    <img
                      src={currentHotel.mainPhoto.preview}
                      alt="Main"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-500">Drop main photo here</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Additional Photos</label>
                <div
                  {...getPhotosProps()}
                  className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 cursor-pointer"
                >
                  <input {...getPhotosInputProps()} />
                  <div className="grid grid-cols-3 gap-4">
                    {currentHotel.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo.preview}
                        alt={`Additional ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ))}
                    <div className="text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-500">Drop photos here</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {isEditing ? 'Update Hotel' : 'Add Hotel'}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Existing Hotels</h3>
            <div className="space-y-4">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{hotel.name}</h4>
                      <p className="text-sm text-gray-600">{hotel.location}</p>
                      <p className="text-sm text-gray-600">
                        ${hotel.pricePerNight} per night
                      </p>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Beach Rooms: {hotel.beachRooms}</p>
                        <p>Pool Rooms: {hotel.poolRooms}</p>
                        <p>Standard Rooms: {hotel.standardRooms}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(hotel)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(hotel.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};