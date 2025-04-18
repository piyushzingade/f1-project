import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ImageUpload.css';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

  // Fetch all images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('/api/upload/images');
      setImages(response.data);
    } catch (err) {
      console.error('Error fetching images:', err);
      setError('Failed to fetch images');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('/api/upload/single', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadedImage(response.data.image);
      setSelectedFile(null);
      setPreview(null);
      
      // Refresh the images list
      fetchImages();
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-upload-container">
      <h2>Image Upload</h2>
      
      <div className="upload-section">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          className="file-input"
        />
        
        {preview && (
          <div className="preview-container">
            <h3>Preview:</h3>
            <img src={preview} alt="Preview" className="preview-image" />
          </div>
        )}
        
        <button 
          onClick={handleUpload} 
          disabled={!selectedFile || loading}
          className="upload-button"
        >
          {loading ? 'Uploading...' : 'Upload Image'}
        </button>
        
        {error && <p className="error-message">{error}</p>}
        
        {uploadedImage && (
          <div className="success-message">
            <p>Image uploaded successfully!</p>
            <p>Filename: {uploadedImage.filename}</p>
            <img 
              src={uploadedImage.path} 
              alt={uploadedImage.originalName} 
              className="uploaded-image"
            />
          </div>
        )}
      </div>
      
      <div className="images-gallery">
        <h3>Uploaded Images</h3>
        {images.length === 0 ? (
          <p>No images uploaded yet</p>
        ) : (
          <div className="images-grid">
            {images.map((image) => (
              <div key={image._id} className="image-card">
                <img src={image.path} alt={image.originalName} className="gallery-image" />
                <p>{image.originalName}</p>
                <p>Uploaded: {new Date(image.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload; 