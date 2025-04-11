import React, { useState } from "react";
import { FadeIn } from "../../../animations/FadeIn";
import { useDropzone } from "react-dropzone";
import { Camera, Save } from "lucide-react";

export const AccountPage = () => {
  const [profileData, setProfileData] = useState({
    name: "John Smith",
    email: "john@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    profilePicture: null,
  });

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setProfileData((prev) => ({
      ...prev,
      profilePicture: Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxFiles: 1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Profile updated:", profileData);
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-8">
              <div className="relative">
                <div
                  {...getRootProps()}
                  className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer overflow-hidden"
                >
                  <input {...getInputProps()} />
                  {profileData.profilePicture ? (
                    <img
                      src={profileData.profilePicture.preview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <Camera className="w-8 h-8 mx-auto text-gray-400" />
                      <span className="text-sm text-gray-500">
                        Upload Photo
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-medium mb-4">Change Password</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={profileData.currentPassword}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        currentPassword: e.target.value,
                      }))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={profileData.newPassword}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={profileData.confirmPassword}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      </FadeIn>
    </div>
  );
};
