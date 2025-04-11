import React, { useState } from "react";
import { FadeIn } from "../../../animations/FadeIn";
import { PlusCircle, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const mockTrips = [
  {
    id: 1,
    name: "Paris Adventure",
    description: "Explore the city of lights",
    price: 1299,
    location: "Paris, France",
    availableSeats: 20,
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-06-07"),
    mainPhoto:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400",
    photos: [
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=200",
      "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?w=200",
    ],
  },
];

export const TripsPage = () => {
  const [trips, setTrips] = useState(mockTrips);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTrip, setCurrentTrip] = useState({
    name: "",
    description: "",
    price: "",
    location: "",
    availableSeats: "",
    startDate: new Date(),
    endDate: new Date(),
    mainPhoto: null,
    photos: [],
  });

  const onDrop = (acceptedFiles, type = "main") => {
    if (type === "main") {
      setCurrentTrip((prev) => ({
        ...prev,
        mainPhoto: Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        }),
      }));
    } else {
      const newPhotos = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setCurrentTrip((prev) => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos],
      }));
    }
  };

  const {
    getRootProps: getMainPhotoProps,
    getInputProps: getMainPhotoInputProps,
  } = useDropzone({
    onDrop: (files) => onDrop(files, "main"),
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxFiles: 1,
  });

  const { getRootProps: getPhotosProps, getInputProps: getPhotosInputProps } =
    useDropzone({
      onDrop: (files) => onDrop(files, "additional"),
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setTrips((prev) =>
        prev.map((trip) => (trip.id === currentTrip.id ? currentTrip : trip))
      );
    } else {
      setTrips((prev) => [...prev, { ...currentTrip, id: Date.now() }]);
    }
    setCurrentTrip({
      name: "",
      description: "",
      price: "",
      location: "",
      availableSeats: "",
      startDate: new Date(),
      endDate: new Date(),
      mainPhoto: null,
      photos: [],
    });
    setIsEditing(false);
  };

  const handleEdit = (trip) => {
    setCurrentTrip(trip);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setTrips((prev) => prev.filter((trip) => trip.id !== id));
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Manage Trips</h2>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Add New Trip</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">
              {isEditing ? "Edit Trip" : "Add New Trip"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Trip Name
                </label>
                <input
                  type="text"
                  value={currentTrip.name}
                  onChange={(e) =>
                    setCurrentTrip((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={currentTrip.description}
                  onChange={(e) =>
                    setCurrentTrip((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    value={currentTrip.price}
                    onChange={(e) =>
                      setCurrentTrip((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Available Seats
                  </label>
                  <input
                    type="number"
                    value={currentTrip.availableSeats}
                    onChange={(e) =>
                      setCurrentTrip((prev) => ({
                        ...prev,
                        availableSeats: e.target.value,
                      }))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  value={currentTrip.location}
                  onChange={(e) =>
                    setCurrentTrip((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <DatePicker
                    selected={currentTrip.startDate}
                    onChange={(date) =>
                      setCurrentTrip((prev) => ({ ...prev, startDate: date }))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <DatePicker
                    selected={currentTrip.endDate}
                    onChange={(date) =>
                      setCurrentTrip((prev) => ({ ...prev, endDate: date }))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Main Photo
                </label>
                <div
                  {...getMainPhotoProps()}
                  className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 cursor-pointer"
                >
                  <input {...getMainPhotoInputProps()} />
                  {currentTrip.mainPhoto ? (
                    <img
                      src={currentTrip.mainPhoto.preview}
                      alt="Main"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-500">
                        Drop main photo here
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Additional Photos
                </label>
                <div
                  {...getPhotosProps()}
                  className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 cursor-pointer"
                >
                  <input {...getPhotosInputProps()} />
                  <div className="grid grid-cols-3 gap-4">
                    {currentTrip.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo.preview}
                        alt={`Additional ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ))}
                    <div className="text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-500">
                        Drop photos here
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {isEditing ? "Update Trip" : "Add Trip"}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Existing Trips</h3>
            <div className="space-y-4">
              {trips.map((trip) => (
                <div key={trip.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{trip.name}</h4>
                      <p className="text-sm text-gray-600">{trip.location}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(trip.startDate).toLocaleDateString()} -{" "}
                        {new Date(trip.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(trip)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(trip.id)}
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
