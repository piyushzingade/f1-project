import React, { useState } from "react";
import image1 from "../assets/image1.jpg";
import Topbar from "../components/Topbar";

const CreatePortfolio = () => {
  const [profileImage, setProfileImage] = useState(null);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4"
      style={{ backgroundImage: `url(${image1})` }}
    >
      <Topbar />
      <div className="w-full max-w-3xl mt-20 p-8 bg-white bg-opacity-50 backdrop-blur-lg rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-brown-700 mb-6">
          Create Your Portfolio
        </h1>
        <form className="space-y-4">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center">
            <label className="relative cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleProfileImageChange}
              />
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg hover:opacity-80 transition">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-sm">
                    Upload Image
                  </div>
                )}
              </div>
            </label>
            <p className="mt-2 text-gray-600 text-sm">
              Click to upload a profile picture
            </p>
          </div>

          {/* Full Name */}
          <div>
            <label className="block font-semibold">Full Name:</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full p-2 border rounded-lg shadow-sm"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block font-semibold">Contact Number:</label>
            <input
              type="text"
              placeholder="123-456-7890"
              className="w-full p-2 border rounded-lg shadow-sm"
            />
          </div>

          {/* Specialization */}
          <div>
            <label className="block font-semibold">
              Photography Specialization:
            </label>
            <input
              type="text"
              placeholder="Wildlife, Portrait, etc."
              className="w-full p-2 border rounded-lg shadow-sm"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block font-semibold">Photographer's Bio:</label>
            <textarea
              placeholder="Write a brief introduction about yourself..."
              className="w-full p-2 border rounded-lg shadow-sm"
            ></textarea>
          </div>

          {/* Upload Best Shots */}
          <div>
            <label className="block font-semibold">
              Upload Your Best Shots:
            </label>
            <label className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md cursor-pointer hover:bg-gray-300 transition">
              <input type="file" className="hidden" />
              <span className="peer-placeholder-shown:text-gray-500">
                Choose File
              </span>
              <span className="ml-2 text-sm text-gray-600">No file chosen</span>
            </label>
          </div>

          {/* Submit Button */}
          <button className="w-full py-2 bg-[#5A3E36] text-white rounded-lg hover:bg-[#422a22] transition">
            Submit Portfolio
          </button>
        </form>
      </div>    
    </div>
  );
};

export default CreatePortfolio;
