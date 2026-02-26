import React from "react";

export default function History({ uploads }) {
  return (
    <div className="uploads-list">
      <h2>History</h2>
      {uploads.length === 0 && <p>No uploads yet.</p>}
      {uploads.map((file) => (
        <div key={file.id} className="upload-item">
          <p>{file.filename}</p>
          <a href={file.url} download>Download</a>
        </div>
      ))}
    </div>
  );
}