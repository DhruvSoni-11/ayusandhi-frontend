import React, { useState } from 'react';

const ImageDownloader = () => {
  const [imageUrl, setImageUrl] = useState('');

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl, { mode: 'cors' });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = imageUrl.split('/').pop() || 'downloaded-image.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      alert('Failed to download image: ' + error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button onClick={handleDownload}>Download Image</button>
    </div>
  );
};

export default ImageDownloader;
