import React, { useState } from "react";
import image1 from "../assets/image1.jpg";
import Topbar from "./Topbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKENDURL } from "../config";

const CreatePortfolio = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [bestShots, setBestShots] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    specialization: "",
    bio: "",
    profileImage: "",
    bestShots: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("file", file);
      
      // Upload the image to the server
      uploadImage(formData, "profileImage");
    }
  };

  const handleBestShotsChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Create preview URLs for the selected images
      const imageUrls = files.map(file => URL.createObjectURL(file));
      
      // Create FormData for file uploads
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append("files", file);
      });
      
      // Upload the images to the server
      uploadImage(formData, "bestShots");
    }
  };

  const uploadImage = async (formData, type) => {
  try {
    setLoading(true);
    const endpoint = type === "profileImage" 
      ? `${BACKENDURL}/upload/single` 
      : `${BACKENDURL}/upload/multiple`;

    const response = await axios.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    if (type === "profileImage") {
      setFormData(prev => ({ ...prev, profileImage: response.data.filePath }));
    } else if (type === "bestShots") {
      setBestShots(prev => [...prev, ...formData.getAll("files").map(file => URL.createObjectURL(file))]);
      setFormData(prev => ({ ...prev, bestShots: [...prev.bestShots, ...response.data.filePaths] }));
    }

    setLoading(false);
  } catch (err) {
    console.error("Error uploading image:", err);
    setError("Failed to upload image. Please try again.");
    setLoading(false);
  }
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError("");
      
      // Validate form data
      if (!formData.fullName || !formData.contactNumber || !formData.specialization || !formData.bio || !formData.profileImage) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }
      
      // Send the portfolio data to the backend
      const response = await axios.post(`${BACKENDURL}/portfolios`, formData);
      
      if (response.status === 201) {
        // Redirect to the portfolio page or show success message
        navigate("/home");
      }
    } catch (err) {
      console.error("Error creating portfolio:", err);
      setError(err.response?.data?.message || "Failed to create portfolio. Please try again.");
    } finally {
      setLoading(false);
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
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center">
            <label className="relative cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleProfileImageChange}
                accept="image/*"
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
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="John Doe"
              className="w-full p-2 border rounded-lg shadow-sm"
              required
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block font-semibold">Contact Number:</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              placeholder="123-456-7890"
              className="w-full p-2 border rounded-lg shadow-sm"
              required
            />
          </div>

          {/* Specialization */}
          <div>
            <label className="block font-semibold">
              Photography Specialization:
            </label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              placeholder="Wildlife, Portrait, etc."
              className="w-full p-2 border rounded-lg shadow-sm"
              required
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block font-semibold">Photographer's Bio:</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Write a brief introduction about yourself..."
              className="w-full p-2 border rounded-lg shadow-sm"
              required
            ></textarea>
          </div>

          {/* Upload Best Shots */}
          <div>
            <label className="block font-semibold">
              Upload Your Best Shots:
            </label>
            <label className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md cursor-pointer hover:bg-gray-300 transition">
              <input 
                type="file" 
                className="hidden" 
                onChange={handleBestShotsChange}
                accept="image/*"
                multiple
              />
              <span className="peer-placeholder-shown:text-gray-500">
                Choose Files
              </span>
              <span className="ml-2 text-sm text-gray-600">
                {bestShots.length > 0 ? `${bestShots.length} files selected` : "No files chosen"}
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full py-2 bg-[#5A3E36] text-white rounded-lg hover:bg-[#422a22] transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Portfolio"}
          </button>
        </form>
      </div>    
    </div>
  );
};

export default CreatePortfolio;
