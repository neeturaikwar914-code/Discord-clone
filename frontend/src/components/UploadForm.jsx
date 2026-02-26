import React from "react";

export default function UploadForm({ onUpload, loading }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) onUpload(file);
  };

  return (
    <div className="upload-section">
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      {loading && <p className="loader">Uploading...</p>}
    </div>
  );
}