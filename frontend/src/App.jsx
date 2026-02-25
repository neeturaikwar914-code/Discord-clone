import React, { useState, useEffect } from 'react';
import { startAudioJob, checkJobStatus } from './api';
import StemPlayer from './components/StemPlayer';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [aiProgress, setAiProgress] = useState(0);
  const [status, setStatus] = useState("IDLE"); // IDLE, UPLOADING, PROCESSING, COMPLETED
  const [stems, setStems] = useState(null);
  const [metadata, setMetadata] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    setStatus("UPLOADING");
    
    try {
      // 1. Start Upload
      const res = await startAudioJob(file, (percent) => {
        setUploadProgress(percent);
        if (percent === 100) setStatus("PROCESSING");
      });

      // 2. Start Polling for AI Completion
      const jobId = res.data.job_id;
      const poll = setInterval(async () => {
        const data = await checkJobStatus(jobId);
        setAiProgress(data.progress);
        
        if (data.status === "COMPLETED") {
          clearInterval(poll);
          setStems(data.stems);
          setMetadata({ bpm: data.bpm });
          setStatus("COMPLETED");
        } else if (data.status === "FAILED") {
          clearInterval(poll);
          alert("AI Error: " + data.error);
          setStatus("IDLE");
        }
      }, 2000);

    } catch (err) {
      console.error(err);
      setStatus("IDLE");
      alert("Server connection failed. Check if backend is awake!");
    }
  };

  return (
    <div className="app-container">
      <h1 className="neon-text">KRI LION <span>PRO</span></h1>
      
      {status === "IDLE" && (
        <div className="upload-box fade-in">
          <p>Professional AI Stem Separation</p>
          <input type="file" id="file-up" onChange={(e) => setFile(e.target.files[0])} hidden />
          <label htmlFor="file-up" className="btn-neon">{file ? file.name : "SELECT AUDIO"}</label>
          {file && <button onClick={handleUpload} className="btn-neon start-btn">EXTRACT STEMS</button>}
        </div>
      )}

      {(status === "UPLOADING" || status === "PROCESSING") && (
        <div className="loader-container fade-in">
          <div className="progress-wrapper">
            <span className="status-text">{status === "UPLOADING" ? "UPLOADING TO CLOUD" : "NEURAL PROCESSING"}</span>
            <div className="progress-bar-container">
              <div className="progress-fill" style={{width: `${status === "UPLOADING" ? uploadProgress : aiProgress}%`}}></div>
            </div>
            <p className="percent-text">{status === "UPLOADING" ? uploadProgress : aiProgress}%</p>
          </div>
          <p className="pulse">This may take 1-2 minutes. Do not refresh.</p>
        </div>
      )}

      {status === "COMPLETED" && stems && (
        <div className="fade-in">
          <div className="meta-info">BPM: {metadata.bpm}</div>
          <StemPlayer stems={stems} />
        </div>
      )}
    </div>
  );
}

export default App;