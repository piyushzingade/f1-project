import React from 'react';
import ImageUpload from '../components/ImageUpload';

const ImageUploadPage = () => {
  return (
    <div className="image-upload-page">
      <h1>Image Upload</h1>
      <p>Upload images to your gallery. Images will be stored in the database and displayed below.</p>
      <ImageUpload />
    </div>
  );
};

export default ImageUploadPage; 